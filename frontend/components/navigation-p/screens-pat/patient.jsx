import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useAuth } from '../../../src/context/AuthContext';

const exercises = [
  { name: 'Walking', detail: 'A gentle way to get moving. Start at a comfortable pace and build gradually.', icon: 'walk-outline' },
  { name: 'Cycling', detail: 'A low-impact option for time outdoors or on a stationary bike.', icon: 'bicycle-outline' },
  { name: 'Swimming', detail: 'Enjoy a full-body workout that is gentle on the joints.', icon: 'water-outline' },
  { name: 'Yoga', detail: 'Stretch, breathe, and make space for a calmer moment.', icon: 'body-outline' },
];

const resources = [
  { title: 'Diabetes education', url: 'https://www.youtube.com/watch?v=wZAjVQWbMlE' },
  { title: 'Blood sugar monitoring', url: 'https://www.youtube.com/watch?v=ODKPEBUnZRI' },
  { title: 'Diabetes support and community', url: 'https://www.youtube.com/watch?v=KEPi8kaAXy4' },
];

const Patient = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const [showExercises, setShowExercises] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const openAppointmentInfo = () => {
    navigation.navigate('Visits');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.overline}>YOUR PERSONAL SPACE</Text>
          <Text style={styles.greeting}>Hello, {user.name.split(' ')[0]} <Text style={styles.wave}>✦</Text></Text>
        </View>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => Alert.alert('Sign out?', 'Your care records will remain safely saved.', [
            { text: 'Stay signed in', style: 'cancel' },
            { text: 'Sign out', style: 'destructive', onPress: () => signOut().catch((error) => Alert.alert('Sign out failed', error.message)) },
          ])}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
        >
          <Ionicons name="person" size={20} color="#2D6A55" />
        </TouchableOpacity>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroIcon}><Ionicons name="leaf" size={23} color="#FFFFFF" /></View>
        <Text style={styles.heroEyebrow}>A NOTE FOR TODAY</Text>
        <Text style={styles.heroTitle}>Small steps count.</Text>
        <Text style={styles.heroText}>You don’t have to do it all today. Choose one kind thing for yourself and start there.</Text>
        <View style={styles.heroFoot}>
          <Ionicons name="sunny-outline" size={16} color="#E7BB74" />
          <Text style={styles.heroFootText}>Progress looks different every day</Text>
        </View>
        <View style={styles.heroDecor} />
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Your care toolkit</Text>
        <Text style={styles.sectionSubtitle}>A few helpful things, all in one place.</Text>
      </View>

      <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => navigation.navigate('Guidance')}>
        <View style={[styles.actionIcon, { backgroundColor: '#E2F0E8' }]}>
          <Ionicons name="bulb-outline" size={21} color="#39755D" />
        </View>
        <View style={styles.actionCopy}>
          <Text style={styles.actionTitle}>Daily guidance</Text>
          <Text style={styles.actionDescription}>Gentle tips for your wellbeing</Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="#98A49D" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => navigation.navigate('Food')}>
        <View style={[styles.actionIcon, { backgroundColor: '#FFF0DE' }]}>
          <Ionicons name="nutrition-outline" size={21} color="#C17D3F" />
        </View>
        <View style={styles.actionCopy}>
          <Text style={styles.actionTitle}>Food guide</Text>
          <Text style={styles.actionDescription}>Explore foods and plan a meal</Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="#98A49D" />
      </TouchableOpacity>

      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickCard} activeOpacity={0.82} onPress={() => navigation.navigate('Reminders')}>
          <View style={[styles.quickIcon, { backgroundColor: '#E9E9F7' }]}>
            <Ionicons name="calendar-outline" size={20} color="#68639D" />
          </View>
          <Text style={styles.quickTitle}>Reminders</Text>
          <Text style={styles.quickDescription}>Keep your day on track</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} activeOpacity={0.82} onPress={openAppointmentInfo}>
          <View style={[styles.quickIcon, { backgroundColor: '#FBE8E2' }]}>
            <Ionicons name="chatbubbles-outline" size={20} color="#C67562" />
          </View>
          <Text style={styles.quickTitle}>Appointments</Text>
          <Text style={styles.quickDescription}>Stay close to your care team</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.actionCard} activeOpacity={0.82} onPress={() => navigation.navigate('People')}>
        <View style={[styles.actionIcon, { backgroundColor: '#E2F0E8' }]}>
          <Ionicons name="people-outline" size={21} color="#39755D" />
        </View>
        <View style={styles.actionCopy}>
          <Text style={styles.actionTitle}>Share care with someone you trust</Text>
          <Text style={styles.actionDescription}>You decide who can see your reminders and visits</Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="#98A49D" />
      </TouchableOpacity>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Move in a way that feels good</Text>
        <Text style={styles.sectionSubtitle}>Ideas to help you find your rhythm.</Text>
      </View>

      <TouchableOpacity
        style={styles.exerciseToggle}
        activeOpacity={0.8}
        onPress={() => setShowExercises((visible) => !visible)}
      >
        <View style={styles.exerciseToggleIcon}><Ionicons name="walk-outline" size={20} color="#39755D" /></View>
        <Text style={styles.exerciseToggleText}>{showExercises ? 'Hide movement ideas' : 'Explore movement ideas'}</Text>
        <Ionicons name={showExercises ? 'chevron-up' : 'chevron-down'} size={18} color="#648075" />
      </TouchableOpacity>

      {showExercises && exercises.map((exercise) => (
        <View key={exercise.name} style={styles.exerciseCard}>
          <Ionicons name={exercise.icon} size={21} color="#39755D" />
          <View style={styles.exerciseCopy}>
            <Text style={styles.exerciseTitle}>{exercise.name}</Text>
            <Text style={styles.exerciseDescription}>{exercise.detail}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.resourceButton} onPress={() => setShowResources(true)} activeOpacity={0.82}>
        <Ionicons name="book-outline" size={18} color="#FFFFFF" />
        <Text style={styles.resourceButtonText}>Discover helpful resources</Text>
        <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.disclaimer}>A supportive companion to care from your health professional.</Text>

      <Modal
        isVisible={showResources}
        onBackdropPress={() => setShowResources(false)}
        onBackButtonPress={() => setShowResources(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalEyebrow}>LEARN AT YOUR OWN PACE</Text>
          <Text style={styles.modalTitle}>Helpful resources</Text>
          {resources.map((resource) => (
            <TouchableOpacity
              key={resource.title}
              style={styles.resourceRow}
              onPress={() => {
                Linking.openURL(resource.url);
                setShowResources(false);
              }}
            >
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Ionicons name="open-outline" size={17} color="#39755D" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.modalClose} onPress={() => setShowResources(false)}>
            <Text style={styles.modalCloseText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8F3' },
  content: { padding: 22, paddingTop: 20, paddingBottom: 30, maxWidth: 620, width: '100%', alignSelf: 'center' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  overline: { color: '#789084', fontSize: 10, letterSpacing: 1.3, fontWeight: '800', marginBottom: 5 },
  greeting: { color: '#203D33', fontSize: 27, fontWeight: '800', letterSpacing: -0.7 },
  wave: { color: '#DBA75F', fontSize: 20 },
  avatar: { width: 42, height: 42, borderRadius: 15, backgroundColor: '#E2F0E8', alignItems: 'center', justifyContent: 'center' },
  heroCard: { overflow: 'hidden', borderRadius: 23, backgroundColor: '#2D6A55', padding: 21, marginBottom: 25 },
  heroIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroEyebrow: { color: '#C8E3D4', fontSize: 10, letterSpacing: 1.5, fontWeight: '800', marginBottom: 7 },
  heroTitle: { color: '#FFFFFF', fontSize: 25, fontWeight: '800', letterSpacing: -0.5 },
  heroText: { color: '#E0EEE5', fontSize: 14, lineHeight: 21, marginTop: 8, maxWidth: 340 },
  heroFoot: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 17 },
  heroFootText: { color: '#D4E8DC', fontSize: 11, fontWeight: '600' },
  heroDecor: { position: 'absolute', width: 170, height: 170, borderRadius: 85, borderWidth: 28, borderColor: 'rgba(255,255,255,0.055)', right: -72, top: 14 },
  sectionHeading: { marginBottom: 12 },
  sectionTitle: { color: '#29483B', fontSize: 17, fontWeight: '800' },
  sectionSubtitle: { color: '#829087', fontSize: 12, marginTop: 4 },
  actionCard: { backgroundColor: '#FFFFFF', borderRadius: 17, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#E9EDE7' },
  actionIcon: { width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  actionCopy: { flex: 1, paddingHorizontal: 12 },
  actionTitle: { color: '#29483B', fontWeight: '700', fontSize: 14 },
  actionDescription: { color: '#829087', fontSize: 11, marginTop: 4 },
  quickRow: { flexDirection: 'row', gap: 10, marginTop: 2, marginBottom: 24 },
  quickCard: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9EDE7', borderRadius: 17, padding: 14 },
  quickIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  quickTitle: { color: '#29483B', fontSize: 13, fontWeight: '700' },
  quickDescription: { color: '#829087', fontSize: 10, lineHeight: 15, marginTop: 4 },
  exerciseToggle: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9EDE7', borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  exerciseToggleIcon: { width: 36, height: 36, backgroundColor: '#E2F0E8', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  exerciseToggleText: { flex: 1, paddingHorizontal: 10, color: '#355547', fontWeight: '700', fontSize: 13 },
  exerciseCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 15, borderWidth: 1, borderColor: '#E9EDE7', padding: 14, marginBottom: 8 },
  exerciseCopy: { flex: 1, marginLeft: 11 },
  exerciseTitle: { color: '#29483B', fontSize: 13, fontWeight: '700', marginBottom: 4 },
  exerciseDescription: { color: '#829087', fontSize: 11, lineHeight: 16 },
  resourceButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D7825E', borderRadius: 15, paddingHorizontal: 16, paddingVertical: 14, marginTop: 14 },
  resourceButtonText: { flex: 1, color: '#FFFFFF', fontSize: 13, fontWeight: '700', marginHorizontal: 10 },
  disclaimer: { color: '#91A097', fontSize: 10, textAlign: 'center', marginTop: 18 },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 22 },
  modalEyebrow: { color: '#789084', fontSize: 10, letterSpacing: 1.2, fontWeight: '800' },
  modalTitle: { color: '#203D33', fontSize: 22, fontWeight: '800', marginTop: 6, marginBottom: 15 },
  resourceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#EEF0EB' },
  resourceTitle: { color: '#355547', fontSize: 13, fontWeight: '600' },
  modalClose: { backgroundColor: '#2D6A55', borderRadius: 13, alignItems: 'center', paddingVertical: 13, marginTop: 14 },
  modalCloseText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});

export default Patient;

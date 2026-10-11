import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../src/context/AuthContext';

const exercises = [
  { name: 'Walking', detail: 'Start at a comfortable pace and build gradually.', icon: 'walk-outline' },
  { name: 'Cycling', detail: 'A low-impact way to support cardiovascular fitness.', icon: 'bicycle-outline' },
  { name: 'Swimming', detail: 'Gentle on the joints and a lovely full-body activity.', icon: 'water-outline' },
  { name: 'Yoga', detail: 'Stretch, breathe, and find a little more balance.', icon: 'body-outline' },
];

const Acommpagnant = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();
  const [showExercises, setShowExercises] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const openAppointmentInfo = () => {
    navigation.navigate('Visits');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.overline}>SUPPORT FOR THE PEOPLE YOU LOVE</Text>
          <Text style={styles.greeting}>Care starts with you{user.name ? `, ${user.name.split(' ')[0]}` : ''}.</Text>
        </View>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => Alert.alert('Sign out?', 'You can sign in again at any time.', [
            { text: 'Stay signed in', style: 'cancel' },
            { text: 'Sign out', style: 'destructive', onPress: () => signOut().catch((error) => Alert.alert('Sign out failed', error.message)) },
          ])}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
        >
          <Ionicons name="people" size={20} color="#2D6A55" />
        </TouchableOpacity>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.heroIcon}><Ionicons name="heart" size={21} color="#FFFFFF" /></View>
          <View style={styles.careTag}><View style={styles.careDot} /><Text style={styles.careTagText}>HERE FOR YOU</Text></View>
        </View>
        <Text style={styles.heroTitle}>Your support makes a difference.</Text>
        <Text style={styles.heroText}>
          Caring for someone is meaningful work. Find practical ideas, helpful guidance, and a little encouragement for yourself, too.
        </Text>
        <Text style={styles.heroSignature}>One moment at a time.</Text>
        <View style={styles.heroDecor} />
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Make care feel a little easier</Text>
        <Text style={styles.sectionSubtitle}>Tools to help you show up with confidence.</Text>
      </View>

      <TouchableOpacity style={styles.actionCard} activeOpacity={0.82} onPress={() => setShowExercises((visible) => !visible)}>
        <View style={[styles.actionIcon, { backgroundColor: '#E2F0E8' }]}>
          <Ionicons name="fitness-outline" size={21} color="#39755D" />
        </View>
        <View style={styles.actionCopy}>
          <Text style={styles.actionTitle}>Movement ideas</Text>
          <Text style={styles.actionDescription}>Explore gentle activities together</Text>
        </View>
        <Ionicons name={showExercises ? 'chevron-up' : 'chevron-forward'} size={19} color="#98A49D" />
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

      <TouchableOpacity style={styles.actionCard} activeOpacity={0.82} onPress={openAppointmentInfo}>
        <View style={[styles.actionIcon, { backgroundColor: '#E9E9F7' }]}>
          <Ionicons name="calendar-outline" size={21} color="#68639D" />
        </View>
        <View style={styles.actionCopy}>
          <Text style={styles.actionTitle}>Appointments</Text>
          <Text style={styles.actionDescription}>Keep care conversations close</Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="#98A49D" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard} activeOpacity={0.82} onPress={() => setModalVisible(true)}>
        <View style={[styles.actionIcon, { backgroundColor: '#FFF0DE' }]}>
          <Ionicons name="play-outline" size={21} color="#C17D3F" />
        </View>
        <View style={styles.actionCopy}>
          <Text style={styles.actionTitle}>A moment of encouragement</Text>
          <Text style={styles.actionDescription}>Take a pause and watch together</Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="#98A49D" />
      </TouchableOpacity>

      <View style={styles.videoCard}>
        <View style={styles.videoHeading}>
          <View>
            <Text style={styles.videoTitle}>A little inspiration</Text>
            <Text style={styles.videoCaption}>A reminder that you’re doing meaningful work.</Text>
          </View>
          <Ionicons name="videocam-outline" size={20} color="#39755D" />
        </View>
        <Video
          source={require('../../best_shot.mp4')}
          style={styles.video}
          controls
          resizeMode="contain"
          onEnd={() => setModalVisible(true)}
        />
      </View>

      <Text style={styles.disclaimer}>Remember to make room for your own wellbeing, too.</Text>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View style={styles.modalCard}>
          <View style={styles.modalIcon}><Ionicons name="heart" size={25} color="#FFFFFF" /></View>
          <Text style={styles.modalEyebrow}>A MOMENT FOR YOU</Text>
          <Text style={styles.modalTitle}>Thank you for showing up.</Text>
          <Text style={styles.modalText}>
            Your patience, kindness, and steady support matter. Remember to offer yourself some of that same care.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>Keep going, gently</Text>
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
  overline: { color: '#789084', fontSize: 9, letterSpacing: 1.05, fontWeight: '800', marginBottom: 6 },
  greeting: { color: '#203D33', fontSize: 25, fontWeight: '800', letterSpacing: -0.6 },
  avatar: { width: 42, height: 42, borderRadius: 15, backgroundColor: '#E2F0E8', alignItems: 'center', justifyContent: 'center' },
  heroCard: { overflow: 'hidden', borderRadius: 23, backgroundColor: '#325F59', padding: 21, marginBottom: 25 },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  heroIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' },
  careTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.13)', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 },
  careDot: { height: 6, width: 6, borderRadius: 3, backgroundColor: '#E8C885', marginRight: 6 },
  careTagText: { color: '#F1E9D8', fontSize: 9, letterSpacing: 1, fontWeight: '800' },
  heroTitle: { color: '#FFFFFF', fontSize: 24, lineHeight: 30, fontWeight: '800', letterSpacing: -0.5, maxWidth: 300 },
  heroText: { color: '#DFECE6', fontSize: 13, lineHeight: 20, marginTop: 9 },
  heroSignature: { color: '#EAD5AC', fontSize: 12, fontWeight: '700', marginTop: 15 },
  heroDecor: { position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 28, borderColor: 'rgba(255,255,255,0.055)', right: -77, bottom: -76 },
  sectionHeading: { marginBottom: 12 },
  sectionTitle: { color: '#29483B', fontSize: 17, fontWeight: '800' },
  sectionSubtitle: { color: '#829087', fontSize: 12, marginTop: 4 },
  actionCard: { backgroundColor: '#FFFFFF', borderRadius: 17, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#E9EDE7' },
  actionIcon: { width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  actionCopy: { flex: 1, paddingHorizontal: 12 },
  actionTitle: { color: '#29483B', fontWeight: '700', fontSize: 14 },
  actionDescription: { color: '#829087', fontSize: 11, marginTop: 4 },
  exerciseCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 15, borderWidth: 1, borderColor: '#E9EDE7', padding: 14, marginBottom: 8 },
  exerciseCopy: { flex: 1, marginLeft: 11 },
  exerciseTitle: { color: '#29483B', fontSize: 13, fontWeight: '700', marginBottom: 4 },
  exerciseDescription: { color: '#829087', fontSize: 11, lineHeight: 16 },
  videoCard: { backgroundColor: '#FFFFFF', borderRadius: 19, padding: 15, marginTop: 8, borderWidth: 1, borderColor: '#E9EDE7' },
  videoHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  videoTitle: { color: '#29483B', fontSize: 14, fontWeight: '700' },
  videoCaption: { color: '#829087', fontSize: 10, marginTop: 4 },
  video: { width: '100%', height: 190, backgroundColor: '#1F2924', borderRadius: 12 },
  disclaimer: { color: '#91A097', fontSize: 10, textAlign: 'center', marginTop: 18 },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 24, alignItems: 'center' },
  modalIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: '#D7825E', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  modalEyebrow: { color: '#789084', fontSize: 10, letterSpacing: 1.2, fontWeight: '800' },
  modalTitle: { color: '#203D33', fontSize: 23, fontWeight: '800', textAlign: 'center', marginTop: 8 },
  modalText: { color: '#718178', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 10 },
  modalButton: { backgroundColor: '#2D6A55', borderRadius: 13, alignItems: 'center', paddingVertical: 13, paddingHorizontal: 22, alignSelf: 'stretch', marginTop: 20 },
  modalButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});

export default Acommpagnant;

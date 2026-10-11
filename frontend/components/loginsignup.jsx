import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const roles = [
  {
    title: 'I’m a patient',
    description: 'Build healthy routines and keep your day on track.',
    icon: 'heart',
    role: 'patient',
    color: '#DDF4E9',
  },
  {
    title: 'I’m a companion',
    description: 'Find helpful ways to support someone you care about.',
    icon: 'people',
    role: 'companion',
    color: '#FCE9D9',
  },
];

const LoginSignup = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <Ionicons name="pulse" size={23} color="#FFFFFF" />
          </View>
          <Text style={styles.brandName}>wellnest</Text>
        </View>

        <View style={styles.hero}>
          <View style={styles.orbit}>
            <View style={styles.heroIcon}>
              <Ionicons name="heart" size={45} color="#FFFFFF" />
            </View>
            <View style={styles.sparkleOne}><Ionicons name="star-outline" size={17} color="#E99B61" /></View>
            <View style={styles.sparkleTwo}><Ionicons name="leaf" size={21} color="#65A88B" /></View>
          </View>
          <Text style={styles.eyebrow}>A LITTLE CARE, EVERY DAY</Text>
          <Text style={styles.title}>Feel better,{'\n'}one day at a time.</Text>
          <Text style={styles.subtitle}>
            A calmer way to manage diabetes—with helpful tools for you and the people by your side.
          </Text>
        </View>

        <View style={styles.roleHeading}>
          <Text style={styles.sectionTitle}>How will you use Wellnest?</Text>
          <Text style={styles.sectionCaption}>Choose a space to get started</Text>
        </View>

        {roles.map((role) => (
          <TouchableOpacity
            key={role.role}
            accessibilityRole="button"
            accessibilityLabel={role.title}
            activeOpacity={0.82}
            style={styles.roleCard}
            onPress={() => navigation.navigate('AUTH', { role: role.role })}
          >
            <View style={[styles.roleIcon, { backgroundColor: role.color }]}>
              <Ionicons name={role.icon} size={22} color="#25483C" />
            </View>
            <View style={styles.roleCopy}>
              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#648075" />
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#759084" />
          <Text style={styles.footerText}>Your wellbeing comes first. This is a supportive space.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8F3' },
  container: { flexGrow: 1, paddingHorizontal: 25, paddingTop: 18, paddingBottom: 28, maxWidth: 560, width: '100%', alignSelf: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#2D6A55', alignItems: 'center', justifyContent: 'center' },
  brandName: { color: '#25483C', fontSize: 20, fontWeight: '800', letterSpacing: -0.6 },
  hero: { alignItems: 'center', marginTop: 24 },
  orbit: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#E5F0E9', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  heroIcon: { width: 94, height: 94, borderRadius: 34, backgroundColor: '#3D8067', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] },
  sparkleOne: { position: 'absolute', right: 12, top: 24, width: 33, height: 33, borderRadius: 17, backgroundColor: '#FFF8EB', alignItems: 'center', justifyContent: 'center' },
  sparkleTwo: { position: 'absolute', left: 9, bottom: 22, width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  eyebrow: { color: '#56806F', fontSize: 11, fontWeight: '800', letterSpacing: 1.6, marginBottom: 9 },
  title: { color: '#203D33', fontSize: 35, lineHeight: 40, fontWeight: '800', letterSpacing: -1.2, textAlign: 'center' },
  subtitle: { maxWidth: 360, color: '#718178', fontSize: 15, lineHeight: 23, textAlign: 'center', marginTop: 12 },
  roleHeading: { marginTop: 29, marginBottom: 12 },
  sectionTitle: { color: '#203D33', fontSize: 18, fontWeight: '800' },
  sectionCaption: { color: '#829087', fontSize: 13, marginTop: 4 },
  roleCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 11, borderWidth: 1, borderColor: '#E9EDE7', shadowColor: '#334D40', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  roleIcon: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  roleCopy: { flex: 1, paddingHorizontal: 12 },
  roleTitle: { color: '#29483B', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  roleDescription: { color: '#829087', fontSize: 12, lineHeight: 17 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12, gap: 7 },
  footerText: { color: '#829087', fontSize: 11, flexShrink: 1 },
});

export default LoginSignup;

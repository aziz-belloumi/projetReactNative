import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../src/context/AuthContext';
import { apiRequest } from '../src/services/api';

const AuthScreen = ({ navigation, route }) => {
  const role = route.params?.role;
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      const session = await apiRequest(`/auth/${isRegistering ? 'register' : 'login'}`, {
        method: 'POST',
        body: {
          ...(isRegistering ? { name: name.trim(), role } : {}),
          email: email.trim().toLowerCase(),
          password,
        },
      });
      if (session.user.role !== role) {
        throw new Error(`This account is registered as a ${session.user.role}. Go back and choose that space.`);
      }
      await signIn(session);
    } catch (requestError) {
      setError(requestError.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} accessibilityRole="button">
            <Ionicons name="arrow-back" size={20} color="#29483B" />
            <Text style={styles.backText}>Choose a different space</Text>
          </TouchableOpacity>
          <View style={styles.brandIcon}><Ionicons name="pulse" size={24} color="#FFFFFF" /></View>
          <Text style={styles.eyebrow}>{role === 'patient' ? 'YOUR PERSONAL SPACE' : 'HERE TO SUPPORT'}</Text>
          <Text style={styles.title}>{isRegistering ? 'Create your account' : 'Welcome back'}</Text>
          <Text style={styles.subtitle}>
            {isRegistering ? 'A secure account keeps your care tools in sync.' : 'Sign in to pick up where you left off.'}
          </Text>

          <View style={styles.form}>
            {isRegistering && (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#9AA69F"
                autoCapitalize="words"
                maxLength={80}
                accessibilityLabel="Your name"
              />
            )}
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              placeholderTextColor="#9AA69F"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              maxLength={254}
              accessibilityLabel="Email address"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder={isRegistering ? 'Password (at least 8 characters)' : 'Password'}
              placeholderTextColor="#9AA69F"
              secureTextEntry
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              textContentType={isRegistering ? 'newPassword' : 'password'}
              maxLength={128}
              accessibilityLabel="Password"
            />
            {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
            <TouchableOpacity
              style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              accessibilityRole="button"
            >
              {isSubmitting
                ? <ActivityIndicator color="#FFFFFF" />
                : <Text style={styles.primaryText}>{isRegistering ? 'Create account' : 'Sign in'}</Text>}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.switchRow} onPress={() => { setIsRegistering((value) => !value); setError(''); }}>
            <Text style={styles.switchText}>
              {isRegistering ? 'Already have an account? ' : 'New to Wellnest? '}
              <Text style={styles.switchAction}>{isRegistering ? 'Sign in' : 'Create an account'}</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.privacyNote}>Your password is protected. Your care records are shared only with people you invite.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#F7F8F3' },
  container: { flexGrow: 1, paddingHorizontal: 25, paddingTop: 20, paddingBottom: 32, maxWidth: 560, width: '100%', alignSelf: 'center' },
  backButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 40 },
  backText: { color: '#536F61', fontSize: 13, fontWeight: '600', marginLeft: 8 },
  brandIcon: { width: 47, height: 47, borderRadius: 16, backgroundColor: '#2D6A55', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  eyebrow: { color: '#56806F', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 9 },
  title: { color: '#203D33', fontSize: 29, lineHeight: 35, fontWeight: '800', letterSpacing: -0.6 },
  subtitle: { color: '#718178', fontSize: 14, lineHeight: 21, marginTop: 8 },
  form: { marginTop: 25 },
  input: { minHeight: 52, borderColor: '#E4EAE3', borderWidth: 1, marginBottom: 12, paddingHorizontal: 15, borderRadius: 14, backgroundColor: '#FFFFFF', color: '#355547', fontSize: 14 },
  error: { color: '#A6463A', backgroundColor: '#FBEAE5', borderRadius: 11, padding: 11, lineHeight: 18, fontSize: 12, marginBottom: 12 },
  primaryButton: { backgroundColor: '#2D6A55', borderRadius: 14, alignItems: 'center', justifyContent: 'center', minHeight: 51, marginTop: 3 },
  disabledButton: { opacity: 0.7 },
  primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  switchRow: { alignSelf: 'center', padding: 13, marginTop: 7 },
  switchText: { color: '#718178', fontSize: 13 },
  switchAction: { color: '#2D6A55', fontWeight: '800' },
  privacyNote: { color: '#829087', fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 'auto', paddingTop: 22 },
});

export default AuthScreen;

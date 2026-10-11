import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../src/context/AuthContext';
import { apiRequest } from '../src/services/api';

const CareConnections = () => {
  const { user, token } = useAuth();
  const isPatient = user.role === 'patient';
  const [connections, setConnections] = useState([]);
  const [sharedRecords, setSharedRecords] = useState({ reminders: [], appointments: [], meals: [] });
  const [inviteCode, setInviteCode] = useState('');
  const [newCode, setNewCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isWorking, setIsWorking] = useState(false);

  const loadConnections = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const { links } = await apiRequest('/care/links', { token });
      const loadedConnections = links.map((link) => ({
        id: link.id,
        person: isPatient ? link.companion : link.patient,
      }));
      setConnections(loadedConnections);

      if (!isPatient && loadedConnections.length) {
        const [reminders, appointments, meals] = await Promise.all([
          apiRequest('/reminders', { token }),
          apiRequest('/appointments', { token }),
          apiRequest('/meals', { token }),
        ]);
        setSharedRecords({ reminders: reminders.reminders, appointments: appointments.appointments, meals: meals.meals });
      } else {
        setSharedRecords({ reminders: [], appointments: [], meals: [] });
      }
    } catch (loadError) {
      setError(loadError.message || 'Your care connections could not be loaded.');
    } finally {
      setIsLoading(false);
    }
  }, [isPatient, token]);

  useFocusEffect(useCallback(() => {
    loadConnections();
  }, [loadConnections]));

  const createInvitation = async () => {
    setError('');
    setMessage('');
    setIsWorking(true);
    try {
      const invitation = await apiRequest('/care/invitations', { token, method: 'POST', body: {} });
      setNewCode(invitation.code);
      setMessage('Share this one-time code privately. It expires in 24 hours.');
    } catch (requestError) {
      setError(requestError.message || 'An invitation could not be created.');
    } finally {
      setIsWorking(false);
    }
  };

  const acceptInvitation = async () => {
    setError('');
    setMessage('');
    setIsWorking(true);
    try {
      await apiRequest('/care/accept', {
        token,
        method: 'POST',
        body: { code: inviteCode.trim().toUpperCase() },
      });
      setInviteCode('');
      setNewCode('');
      setMessage('You are connected. The patient has chosen to share their care records with you.');
      await loadConnections();
    } catch (requestError) {
      setError(requestError.message || 'The invitation could not be accepted.');
    } finally {
      setIsWorking(false);
    }
  };

  const removeConnection = (connection) => {
    Alert.alert(
      isPatient ? 'Remove companion?' : 'Disconnect from patient?',
      'This immediately stops sharing care records between these accounts.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            setError('');
            try {
              await apiRequest(`/care/links/${connection.person.id}`, { token, method: 'DELETE' });
              await loadConnections();
            } catch (requestError) {
              setError(requestError.message || 'The connection could not be removed.');
            }
          },
        },
      ],
    );
  };

  const formatWhen = (value) => new Date(value).toLocaleString();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>{isPatient ? 'YOU ARE IN CONTROL' : 'CARE, TOGETHER'}</Text>
      <Text style={styles.title}>{isPatient ? 'People by your side' : 'Shared care'}</Text>
      <Text style={styles.subtitle}>
        {isPatient
          ? 'Only people you invite can view your reminders and appointments.'
          : 'Patients choose exactly who can see their shared care records.'}
      </Text>

      {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
      {!!message && <Text style={styles.message}>{message}</Text>}

      {isPatient ? (
        <View style={styles.card}>
          <View style={styles.cardIcon}><Ionicons name="person-add-outline" size={22} color="#39755D" /></View>
          <Text style={styles.cardTitle}>Invite someone you trust</Text>
          <Text style={styles.body}>Create a one-time code. Anyone who accepts it can view your reminders and appointments until you disconnect them.</Text>
          {!!newCode && <Text selectable style={styles.inviteCode}>{newCode}</Text>}
          <TouchableOpacity style={styles.primaryButton} onPress={createInvitation} disabled={isWorking}>
            {isWorking ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryText}>{newCode ? 'Create a new code' : 'Create invite code'}</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <View style={styles.cardIcon}><Ionicons name="key-outline" size={22} color="#39755D" /></View>
          <Text style={styles.cardTitle}>Connect with a patient</Text>
          <Text style={styles.body}>Ask them to create an invite code and share it with you privately.</Text>
          <TextInput
            style={styles.input}
            value={inviteCode}
            onChangeText={(value) => setInviteCode(value.toUpperCase())}
            placeholder="Enter invitation code"
            placeholderTextColor="#9AA69F"
            autoCapitalize="characters"
            maxLength={32}
            accessibilityLabel="Invitation code"
          />
          <TouchableOpacity style={styles.primaryButton} onPress={acceptInvitation} disabled={isWorking || inviteCode.trim().length < 8}>
            {isWorking ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryText}>Connect securely</Text>}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>{isPatient ? 'Your companions' : 'People who shared with you'}</Text>
        <TouchableOpacity onPress={loadConnections} accessibilityRole="button" accessibilityLabel="Refresh shared care">
          <Ionicons name="refresh-outline" size={19} color="#39755D" />
        </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator color="#39755D" style={styles.loader} /> : connections.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="people-outline" size={27} color="#719181" />
          <Text style={styles.emptyTitle}>{isPatient ? 'Your care is private' : 'No shared care yet'}</Text>
          <Text style={styles.body}>
            {isPatient ? 'Create an invite code when you are ready to share.' : 'A patient can invite you with a one-time code.'}
          </Text>
        </View>
      ) : connections.map((connection) => {
        const personId = connection.person.id;
        const reminders = sharedRecords.reminders.filter((item) => String(item.patient) === String(personId));
        const appointments = sharedRecords.appointments.filter((item) => String(item.patient) === String(personId));
        const meals = sharedRecords.meals.filter((item) => String(item.patient) === String(personId));
        return (
          <View key={connection.id} style={styles.connectionCard}>
            <View style={styles.connectionHeader}>
              <View style={styles.personIcon}><Ionicons name={isPatient ? 'person' : 'heart'} size={17} color="#39755D" /></View>
              <View style={styles.personCopy}>
                <Text style={styles.personName}>{connection.person.name}</Text>
                <Text style={styles.personEmail}>{connection.person.email}</Text>
              </View>
              <TouchableOpacity onPress={() => removeConnection(connection)} accessibilityRole="button" accessibilityLabel="Disconnect this care connection">
                <Ionicons name="close-circle-outline" size={22} color="#B76B5D" />
              </TouchableOpacity>
            </View>
            {!isPatient && (
              <>
                <Text style={styles.recordHeading}>Reminders ({reminders.length})</Text>
                {reminders.slice(0, 3).map((reminder) => (
                  <Text key={reminder.id} style={styles.recordText}>{reminder.title} · {formatWhen(reminder.dueAt)}</Text>
                ))}
                <Text style={styles.recordHeading}>Appointments ({appointments.length})</Text>
                {appointments.slice(0, 3).map((appointment) => (
                  <Text key={appointment.id} style={styles.recordText}>{appointment.title} · {formatWhen(appointment.startsAt)}</Text>
                ))}
                <Text style={styles.recordHeading}>Recent meals ({meals.length})</Text>
                {meals.slice(0, 3).map((meal) => (
                  <Text key={meal.id} style={styles.recordText}>
                    {meal.mealType} · {meal.foods.map((food) => food.name).join(', ')}
                  </Text>
                ))}
                {!reminders.length && !appointments.length && !meals.length && <Text style={styles.body}>No shared reminders, meals, or appointments yet.</Text>}
              </>
            )}
          </View>
        );
      })}
      <Text style={styles.disclaimer}>You can disconnect a care connection at any time.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8F3' },
  container: { padding: 21, paddingTop: 22, paddingBottom: 32, maxWidth: 620, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#789084', fontSize: 9, letterSpacing: 1.1, fontWeight: '800', marginBottom: 6 },
  title: { color: '#203D33', fontSize: 26, fontWeight: '800' },
  subtitle: { color: '#829087', fontSize: 12, lineHeight: 18, marginTop: 5, marginBottom: 17 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E9EDE7', padding: 16, marginBottom: 22 },
  cardIcon: { height: 42, width: 42, borderRadius: 14, backgroundColor: '#E2F0E8', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  cardTitle: { color: '#29483B', fontSize: 15, fontWeight: '800' },
  body: { color: '#829087', fontSize: 12, lineHeight: 18, marginTop: 6 },
  inviteCode: { color: '#2D6A55', fontSize: 25, fontWeight: '900', letterSpacing: 3, textAlign: 'center', backgroundColor: '#EAF4ED', borderRadius: 13, padding: 14, marginTop: 14 },
  input: { minHeight: 47, borderColor: '#E4EAE3', borderWidth: 1, marginTop: 13, paddingHorizontal: 13, borderRadius: 12, backgroundColor: '#FAFBF8', color: '#355547', fontSize: 15, letterSpacing: 1.5 },
  primaryButton: { backgroundColor: '#2D6A55', borderRadius: 12, alignItems: 'center', justifyContent: 'center', minHeight: 45, marginTop: 13 },
  primaryText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#29483B', fontSize: 16, fontWeight: '800' },
  loader: { margin: 24 },
  emptyCard: { backgroundColor: '#FFFFFF', borderRadius: 17, borderWidth: 1, borderColor: '#E9EDE7', alignItems: 'center', padding: 21 },
  emptyTitle: { color: '#29483B', fontSize: 14, fontWeight: '800', marginTop: 9 },
  connectionCard: { backgroundColor: '#FFFFFF', borderRadius: 17, borderWidth: 1, borderColor: '#E9EDE7', padding: 14, marginBottom: 10 },
  connectionHeader: { flexDirection: 'row', alignItems: 'center' },
  personIcon: { height: 37, width: 37, borderRadius: 13, backgroundColor: '#E2F0E8', alignItems: 'center', justifyContent: 'center' },
  personCopy: { flex: 1, marginHorizontal: 10 },
  personName: { color: '#355547', fontSize: 13, fontWeight: '800' },
  personEmail: { color: '#829087', fontSize: 10, marginTop: 3 },
  recordHeading: { color: '#39755D', fontSize: 11, fontWeight: '800', marginTop: 13, marginBottom: 4 },
  recordText: { color: '#536F61', fontSize: 11, lineHeight: 17, marginTop: 3 },
  disclaimer: { color: '#91A097', textAlign: 'center', fontSize: 10, marginTop: 9 },
  error: { color: '#A6463A', backgroundColor: '#FBEAE5', borderRadius: 11, padding: 11, lineHeight: 18, fontSize: 12, marginBottom: 12 },
  message: { color: '#32664E', backgroundColor: '#E2F0E8', borderRadius: 11, padding: 11, lineHeight: 18, fontSize: 12, marginBottom: 12 },
});

export default CareConnections;

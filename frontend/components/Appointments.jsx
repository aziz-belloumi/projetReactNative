import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../src/context/AuthContext';
import { apiRequest } from '../src/services/api';

const Appointments = () => {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiRequest('/appointments', { token });
      if (user.role === 'companion') {
        const { links } = await apiRequest('/care/links', { token });
        const namesById = new Map(links.map((link) => [String(link.patient.id), link.patient.name]));
        setAppointments(response.appointments.map((appointment) => ({
          ...appointment,
          patientName: namesById.get(String(appointment.patient)) || 'Shared patient',
        })));
      } else {
        setAppointments(response.appointments);
      }
    } catch (loadError) {
      setError(loadError.message || 'Appointments could not be loaded.');
    } finally {
      setIsLoading(false);
    }
  }, [token, user.role]);

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [loadAppointments]));

  const saveAppointment = async () => {
    setError('');
    const dateTime = new Date(`${date.trim()}T${time.trim()}`);
    if (!title.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(date.trim()) || !/^\d{2}:\d{2}$/.test(time.trim()) || Number.isNaN(dateTime.getTime())) {
      setError('Enter a title, date in YYYY-MM-DD format, and time in 24-hour HH:MM format.');
      return;
    }

    setIsSaving(true);
    try {
      await apiRequest('/appointments', {
        token,
        method: 'POST',
        body: { title: title.trim(), startsAt: dateTime.toISOString(), location: location.trim(), notes: notes.trim() },
      });
      setTitle('');
      setDate('');
      setTime('');
      setLocation('');
      setNotes('');
      await loadAppointments();
    } catch (saveError) {
      setError(saveError.message || 'The appointment could not be saved.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAppointment = (id) => {
    Alert.alert('Delete appointment?', 'This removes the appointment from your care plan.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setError('');
          try {
            await apiRequest(`/appointments/${id}`, { token, method: 'DELETE' });
            await loadAppointments();
          } catch (deleteError) {
            setError(deleteError.message || 'The appointment could not be removed.');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>A LITTLE MORE ORGANIZED</Text>
      <Text style={styles.title}>Appointments</Text>
      <Text style={styles.subtitle}>Keep your upcoming care visits in one place.</Text>

      {user.role === 'patient' && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Add an appointment</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Appointment name" placeholderTextColor="#9AA69F" maxLength={120} accessibilityLabel="Appointment name" />
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.halfInput]} value={date} onChangeText={setDate} placeholder="Date (YYYY-MM-DD)" placeholderTextColor="#9AA69F" maxLength={10} accessibilityLabel="Appointment date" />
            <TextInput style={[styles.input, styles.halfInput]} value={time} onChangeText={setTime} placeholder="Time (HH:MM)" placeholderTextColor="#9AA69F" maxLength={5} accessibilityLabel="Appointment time" />
          </View>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Location (optional)" placeholderTextColor="#9AA69F" maxLength={160} accessibilityLabel="Appointment location" />
          <TextInput style={[styles.input, styles.notes]} value={notes} onChangeText={setNotes} placeholder="Notes (optional)" placeholderTextColor="#9AA69F" multiline maxLength={500} accessibilityLabel="Appointment notes" />
          {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.primaryButton} onPress={saveAppointment} disabled={isSaving}>
            {isSaving ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryText}>Save appointment</Text>}
          </TouchableOpacity>
        </View>
      )}

      {user.role !== 'patient' && !!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
      <View style={styles.listHeading}>
        <Text style={styles.sectionTitle}>Upcoming care</Text>
        <TouchableOpacity onPress={loadAppointments} accessibilityRole="button" accessibilityLabel="Refresh appointments">
          <Ionicons name="refresh-outline" size={19} color="#39755D" />
        </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator color="#39755D" style={styles.loader} /> : appointments.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="calendar-clear-outline" size={26} color="#39755D" />
          <Text style={styles.emptyTitle}>No appointments yet</Text>
          <Text style={styles.emptyText}>Appointments you add will show up here and be visible to companions you invite.</Text>
        </View>
      ) : appointments.map((appointment) => (
        <View style={styles.appointmentCard} key={appointment.id}>
          <View style={styles.dateIcon}><Ionicons name="calendar-outline" size={19} color="#39755D" /></View>
          <View style={styles.appointmentCopy}>
            <Text style={styles.appointmentTitle}>{appointment.title}</Text>
            {!!appointment.patientName && <Text style={styles.detail}>For {appointment.patientName}</Text>}
            <Text style={styles.appointmentDate}>{new Date(appointment.startsAt).toLocaleString()}</Text>
            {!!appointment.location && <Text style={styles.detail}>{appointment.location}</Text>}
            {!!appointment.notes && <Text style={styles.detail}>{appointment.notes}</Text>}
          </View>
          {user.role === 'patient' && (
            <TouchableOpacity onPress={() => deleteAppointment(appointment.id)} accessibilityRole="button" accessibilityLabel={`Delete ${appointment.title}`}>
              <Ionicons name="trash-outline" size={18} color="#B76B5D" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <Text style={styles.disclaimer}>This planner is a reminder tool, not a booking service.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8F3' },
  container: { padding: 21, paddingTop: 22, paddingBottom: 32, maxWidth: 620, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#789084', fontSize: 9, letterSpacing: 1.1, fontWeight: '800', marginBottom: 6 },
  title: { color: '#203D33', fontSize: 26, fontWeight: '800' },
  subtitle: { color: '#829087', fontSize: 12, marginTop: 5, marginBottom: 17 },
  form: { backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E9EDE7', padding: 15, marginBottom: 22 },
  formTitle: { color: '#29483B', fontSize: 14, fontWeight: '800', marginBottom: 10 },
  input: { minHeight: 45, borderColor: '#E7ECE6', borderWidth: 1, marginBottom: 9, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: '#FAFBF8', color: '#355547', fontSize: 12 },
  row: { flexDirection: 'row', gap: 9 },
  halfInput: { flex: 1, minWidth: 0 },
  notes: { minHeight: 72, textAlignVertical: 'top' },
  primaryButton: { backgroundColor: '#2D6A55', borderRadius: 12, alignItems: 'center', justifyContent: 'center', minHeight: 45, marginTop: 2 },
  primaryText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  listHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#29483B', fontSize: 16, fontWeight: '800' },
  loader: { margin: 24 },
  emptyCard: { backgroundColor: '#FFFFFF', borderRadius: 17, borderWidth: 1, borderColor: '#E9EDE7', alignItems: 'center', padding: 22 },
  emptyTitle: { color: '#29483B', fontSize: 14, fontWeight: '800', marginTop: 9 },
  emptyText: { color: '#829087', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 6 },
  appointmentCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9EDE7', flexDirection: 'row', alignItems: 'flex-start', padding: 13, marginBottom: 9, borderRadius: 15 },
  dateIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: '#E2F0E8', alignItems: 'center', justifyContent: 'center' },
  appointmentCopy: { flex: 1, paddingHorizontal: 11 },
  appointmentTitle: { color: '#355547', fontWeight: '800', fontSize: 13 },
  appointmentDate: { color: '#39755D', fontSize: 11, marginTop: 4, fontWeight: '700' },
  detail: { color: '#829087', fontSize: 11, marginTop: 3 },
  disclaimer: { color: '#91A097', textAlign: 'center', fontSize: 10, marginTop: 9 },
  error: { color: '#A6463A', backgroundColor: '#FBEAE5', borderRadius: 11, padding: 11, lineHeight: 18, fontSize: 12, marginBottom: 12 },
});

export default Appointments;

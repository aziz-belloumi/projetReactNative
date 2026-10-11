import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../../src/context/AuthContext';
import { apiRequest } from '../../../src/services/api';

const Reminder = () => {
  const { token, user } = useAuth();
  const canEdit = user.role === 'patient';
  const [reminders, setReminders] = useState([]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminderName, setNewReminderName] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadReminders = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiRequest('/reminders', { token });
      setReminders(response.reminders);
    } catch (loadError) {
      setError(loadError.message || 'Reminders could not be loaded.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useFocusEffect(useCallback(() => {
    loadReminders();
  }, [loadReminders]));

  const handleAddReminder = async () => {
    setError('');
    const dueAt = new Date(`${newReminderDate.trim()}T${newReminderTime.trim()}:00`);
    const dateParts = newReminderDate.trim().split('-').map(Number);
    if (
      !newReminderName.trim()
      || !/^\d{4}-\d{2}-\d{2}$/.test(newReminderDate.trim())
      || !/^\d{2}:\d{2}$/.test(newReminderTime.trim())
      || Number.isNaN(dueAt.getTime())
      || dueAt.getFullYear() !== dateParts[0]
      || dueAt.getMonth() + 1 !== dateParts[1]
      || dueAt.getDate() !== dateParts[2]
    ) {
      setError('Enter a reminder name, a valid YYYY-MM-DD date, and a 24-hour HH:MM time.');
      return;
    }

    setIsSaving(true);
    try {
      await apiRequest('/reminders', {
        token,
        method: 'POST',
        body: { title: newReminderName.trim(), dueAt: dueAt.toISOString() },
      });
      setNewReminderName('');
      setNewReminderDate('');
      setNewReminderTime('');
      setShowAddReminder(false);
      await loadReminders();
    } catch (saveError) {
      setError(saveError.message || 'The reminder could not be saved.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteReminder = (reminderId) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteReminder(reminderId) },
      ],
      { cancelable: false }
    );
  };

  const deleteReminder = async (reminderId) => {
    setError('');
    try {
      await apiRequest(`/reminders/${reminderId}`, { token, method: 'DELETE' });
      await loadReminders();
    } catch (deleteError) {
      setError(deleteError.message || 'The reminder could not be removed.');
    }
  };

  const toggleReminder = async (reminder) => {
    setError('');
    try {
      await apiRequest(`/reminders/${reminder.id}`, {
        token,
        method: 'PATCH',
        body: { completed: !reminder.completed },
      });
      await loadReminders();
    } catch (updateError) {
      setError(updateError.message || 'The reminder could not be updated.');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>A LITTLE HELP, RIGHT ON TIME</Text>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>Reminders</Text>
            <Text style={styles.subtitle}>Make space for the things that matter.</Text>
          </View>
          {canEdit && <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowAddReminder(!showAddReminder)}
            accessibilityRole="button"
            accessibilityLabel={showAddReminder ? 'Close reminder form' : 'Add a reminder'}
          >
            <Ionicons name={showAddReminder ? 'close' : 'add'} size={22} color="#FFFFFF" />
          </TouchableOpacity>}
        </View>

      {canEdit && showAddReminder && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Create a reminder</Text>
          <TextInput
            style={styles.input}
            placeholder="What would you like to remember?"
            placeholderTextColor="#9AA69F"
            value={newReminderName}
            onChangeText={setNewReminderName}
          />
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Date (YYYY-MM-DD)"
              placeholderTextColor="#9AA69F"
              value={newReminderDate}
              onChangeText={setNewReminderDate}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Time (HH:MM)"
              placeholderTextColor="#9AA69F"
              value={newReminderTime}
              onChangeText={setNewReminderTime}
              maxLength={5}
            />
          </View>
          {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.addButton} onPress={handleAddReminder} activeOpacity={0.8} disabled={isSaving}>
            <Text style={styles.buttonText}>{isSaving ? 'Saving…' : 'Save reminder'}</Text>
          </TouchableOpacity>
        </View>
      )}

        {!!error && !showAddReminder && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
        <View style={styles.listHeading}>
          <Text style={styles.listTitle}>{canEdit ? 'Your list' : 'Shared reminders'}</Text>
          <Text style={styles.reminderCount}>{reminders.length}</Text>
        </View>
        {isLoading ? (
          <View style={styles.emptyCard}><Text style={styles.emptyText}>Loading your reminders…</Text></View>
        ) : reminders.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}><Ionicons name="calendar-clear-outline" size={25} color="#39755D" /></View>
            <Text style={styles.emptyTitle}>A little more breathing room</Text>
            <Text style={styles.emptyText}>{canEdit ? 'Add a reminder for something you want to keep in mind.' : 'No reminders have been shared with you yet.'}</Text>
            {canEdit && !showAddReminder && (
              <TouchableOpacity style={styles.emptyAction} onPress={() => setShowAddReminder(true)}>
                <Text style={styles.emptyActionText}>Add your first reminder</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : reminders.map((reminder) => (
          <View key={reminder.id} style={[styles.reminderItem, reminder.completed && styles.completedItem]}>
            {canEdit ? (
              <TouchableOpacity style={styles.reminderIcon} onPress={() => toggleReminder(reminder)} accessibilityRole="button" accessibilityLabel={reminder.completed ? 'Mark incomplete' : 'Mark complete'}>
                <Ionicons name={reminder.completed ? 'checkmark-circle' : 'notifications-outline'} size={20} color="#39755D" />
              </TouchableOpacity>
            ) : (
              <View style={styles.reminderIcon}><Ionicons name="notifications-outline" size={20} color="#39755D" /></View>
            )}
            <View style={styles.reminderCopy}>
              <Text style={styles.reminderName}>{reminder.title}</Text>
              <Text style={styles.reminderDate}>{new Date(reminder.dueAt).toLocaleString()}</Text>
            </View>
            {canEdit && <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteReminder(reminder.id)}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${reminder.title}`}
            >
              <AntDesign name="delete" size={16} color="#B76B5D" />
            </TouchableOpacity>}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8F3' },
  container: { flexGrow: 1, paddingHorizontal: 21, paddingTop: 22, paddingBottom: 30 },
  content: { width: '100%', maxWidth: 620, alignSelf: 'center' },
  eyebrow: { color: '#789084', fontSize: 9, letterSpacing: 1.1, fontWeight: '800', marginBottom: 6 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  title: { color: '#203D33', fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: '#829087', fontSize: 12, marginTop: 4 },
  icon: { height: 43, width: 43, borderRadius: 14, backgroundColor: '#2D6A55', alignItems: 'center', justifyContent: 'center' },
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E9EDE7', padding: 15, marginBottom: 22 },
  formTitle: { color: '#29483B', fontSize: 14, fontWeight: '800', marginBottom: 12 },
  input: { minHeight: 45, borderColor: '#E7ECE6', borderWidth: 1, marginBottom: 9, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: '#FAFBF8', color: '#355547', fontSize: 12, flex: 1 },
  formRow: { flexDirection: 'row', gap: 9 },
  halfInput: { minWidth: 0 },
  addButton: { backgroundColor: '#2D6A55', borderRadius: 12, alignItems: 'center', paddingVertical: 13, marginTop: 2 },
  buttonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  listHeading: { flexDirection: 'row', alignItems: 'center', marginBottom: 11 },
  listTitle: { color: '#29483B', fontSize: 16, fontWeight: '800' },
  reminderCount: { color: '#39755D', backgroundColor: '#E2F0E8', overflow: 'hidden', borderRadius: 9, minWidth: 24, textAlign: 'center', fontSize: 11, fontWeight: '800', marginLeft: 8, paddingHorizontal: 6, paddingVertical: 3 },
  emptyCard: { backgroundColor: '#FFFFFF', borderRadius: 19, borderWidth: 1, borderColor: '#E9EDE7', alignItems: 'center', paddingHorizontal: 23, paddingVertical: 26 },
  emptyIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: '#E2F0E8', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  emptyTitle: { color: '#29483B', fontSize: 15, fontWeight: '800', textAlign: 'center' },
  emptyText: { color: '#829087', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 7 },
  emptyAction: { backgroundColor: '#E2F0E8', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 11, marginTop: 16 },
  emptyActionText: { color: '#39755D', fontSize: 11, fontWeight: '800' },
  reminderItem: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9EDE7', flexDirection: 'row', alignItems: 'center', padding: 13, marginBottom: 9, borderRadius: 15 },
  completedItem: { opacity: 0.65 },
  reminderIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: '#E2F0E8', alignItems: 'center', justifyContent: 'center' },
  reminderCopy: { flex: 1, paddingHorizontal: 11 },
  reminderName: { color: '#355547', fontWeight: '700', fontSize: 13 },
  reminderDate: { color: '#829087', fontSize: 11, marginTop: 4 },
  deleteButton: { width: 34, height: 34, borderRadius: 11, backgroundColor: '#FBEAE5', alignItems: 'center', justifyContent: 'center' },
  error: { color: '#A6463A', backgroundColor: '#FBEAE5', borderRadius: 11, padding: 10, lineHeight: 17, fontSize: 11, marginBottom: 12 },
});

export default Reminder;

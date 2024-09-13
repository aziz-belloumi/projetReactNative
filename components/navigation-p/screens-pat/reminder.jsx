import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminderName, setNewReminderName] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');

  const handleAddReminder = () => {
    // Validate input fields
    if (!newReminderName || !newReminderDate || !newReminderTime) {
      Alert.alert('Incomplete Input', 'Please enter a name, date, and time for the reminder.');
      return;
    }

    // Add the new reminder
    const newReminder = {
      id: Math.random().toString(),
      name: newReminderName,
      date: newReminderDate,
      time: newReminderTime,
    };

    setReminders((prevReminders) => [...prevReminders, newReminder]);

    // Clear input fields
    setNewReminderName('');
    setNewReminderDate('');
    setNewReminderTime('');

    // Hide the input fields
    setShowAddReminder(false);
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

  const deleteReminder = (reminderId) => {
    setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== reminderId));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.reminderItem} onPress={() => handleDeleteReminder(item.id)}>
      <View>
        <Text style={styles.reminderName}>{item.name}</Text>
        <Text>{`Date: ${item.date}, Time: ${item.time}`}</Text>
      </View>
      <AntDesign name="delete" size={24} color="red" />
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => setShowAddReminder(!showAddReminder)}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Reminders</Text>
      {showAddReminder && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newReminderName}
            onChangeText={(text) => setNewReminderName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date (e.g., 2024-01-01)"
            value={newReminderDate}
            onChangeText={(text) => setNewReminderDate(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Time (e.g., 12:00 PM)"
            value={newReminderTime}
            onChangeText={(text) => setNewReminderTime(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
            <Text style={styles.buttonText}>Add Reminder</Text>
          </TouchableOpacity>
        </>
      )}
      <FlatList data={reminders} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c00b4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    width: '80%',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    width: '79%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reminderItem: {
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width:350,
  },
  reminderName: {
    fontWeight: 'bold',
  },
});

export default Reminder;

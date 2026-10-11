import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Acommpagnant from './screens-pat/patient.jsx';
import Aide from './screens-pat/aide.jsx';
import Food from './screens-pat/food.jsx';
import Reminder from './screens-pat/reminder.jsx';
import CareConnections from '../CareConnections';
import Appointments from '../Appointments';

const PatientName = 'Today';
const AideName = 'Guidance';
const FoodName = 'Food';
const ReminderName = 'Reminders';
const CareName = 'People';
const AppointmentName = 'Visits';

const Tab = createBottomTabNavigator();

const Navigationp = () => {
  return (
      <Tab.Navigator
        initialRouteName={PatientName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#2D6A55',
          tabBarInactiveTintColor: '#98A49D',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 5 },
          tabBarStyle: {
            height: 66,
            paddingTop: 8,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E9EDE7',
            elevation: 8,
          },
          tabBarIcon: ({ focused, color, size }) => {
            const icons = {
              [PatientName]: focused ? 'home' : 'home-outline',
              [AideName]: focused ? 'bulb' : 'bulb-outline',
              [FoodName]: focused ? 'nutrition' : 'nutrition-outline',
              [ReminderName]: focused ? 'calendar' : 'calendar-outline',
              [CareName]: focused ? 'people' : 'people-outline',
              [AppointmentName]: focused ? 'medkit' : 'medkit-outline',
            };
            const iconName = icons[route.name];
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name={PatientName}
          component={Acommpagnant}
          options={{ tabBarLabel: 'Today' }}
        />
        <Tab.Screen
          name={AideName}
          component={Aide}
          options={{ tabBarLabel: 'Guidance' }}
        />
        <Tab.Screen
          name={FoodName}
          component={Food}
          options={{ tabBarLabel: 'Food guide' }}
        />
        <Tab.Screen
          name={ReminderName}
          component={Reminder}
          options={{ tabBarLabel: 'Reminders' }}
        />
        <Tab.Screen
          name={CareName}
          component={CareConnections}
          options={{ tabBarLabel: 'Sharing' }}
        />
        <Tab.Screen
          name={AppointmentName}
          component={Appointments}
          options={{ tabBarLabel: 'Visits' }}
        />
      </Tab.Navigator>
  );
};

export default Navigationp;

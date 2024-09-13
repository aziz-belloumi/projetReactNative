import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Acommpagnant from './screens-pat/patient.jsx';
import Aide from './screens-pat/aide.jsx';
import Food from './screens-pat/food.jsx';
import Reminder from './screens-pat/reminder.jsx';

const AccompagnantName = 'Patient';
const AideName = 'Help';
const FoodName = 'Food';
const ReminderName = 'Reminder';

const Tab = createBottomTabNavigator();

const Navigationp = () => {
  return (
      <Tab.Navigator
        initialRouteName={AccompagnantName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === AccompagnantName) {
              iconName = focused ? 'people' : 'people-outline';
            } else if (rn === AideName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === FoodName) {
              iconName = focused ? 'fast-food' : 'fast-food-outline';
            } else if (rn === ReminderName) {
              iconName = focused ? 'date-range' : 'calendar-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name={AccompagnantName}
          component={Acommpagnant}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={AideName}
          component={Aide}
          initialParams={{ diabetesType: 'type1' }} // Set the default type or adjust accordingly
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={FoodName}
          component={Food}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={ReminderName}
          component={Reminder}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
  );
};

export default Navigationp;

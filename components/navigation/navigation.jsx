import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Acommpagnant from './screens/acommpagnant.jsx';
import Aide from './screens/aide.jsx';
import Food from './screens/food.jsx';

const AccompagnantName = 'Companion';
const AideName = 'Help';
const FoodName = 'Food';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
      <Tab.Navigator
        initialRouteName={AccompagnantName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === AccompagnantName) {
              iconName = focused ? 'Acommpagnant' : 'people-outline';
            } else if (rn === AideName) {
              iconName = focused ? 'Aide' : 'list-outline';
            } else if (rn === FoodName) {
              iconName = focused ? 'Food' : 'fast-food-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name={AccompagnantName}
          component={Acommpagnant}
          options={{headerShown: false}}
        />
<Tab.Screen
  name={AideName}
  component={Aide}
  initialParams={{ diabetesType: 'type1' }} // Set the default type or adjust accordingly
  options={{headerShown: false}}
/>
        <Tab.Screen
          name={FoodName}
          component={Food}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
  );
};

export default Navigation;

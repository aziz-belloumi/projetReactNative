// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSignup from '/home/hp/Bureau/project/components/loginsignup.jsx';
import Navigation from '/home/hp/Bureau/project/components/navigation/navigation.jsx';
import Navigationp from '/home/hp/Bureau/project/components/navigation-p/navigationpatient.jsx';

const Stack = createStackNavigator();

const App = () => {
  return (
<NavigationContainer>
<Stack.Navigator
  initialRouteName="LoginSignup"
  screenOptions={{
    headerTitleAlign: 'center', // Align the header title to the center
  }}
>
  <Stack.Screen
    name="WELCOME"
    component={LoginSignup}
    options={{ title: 'WELCOME',headerTintColor: '#3c009d' }}
  />
  <Stack.Screen
    name="COMPANION"
    component={Navigation}
    options={{ title: 'COMPANION' ,headerTintColor: '#3c009d'}}
  />
  <Stack.Screen
    name="PATIENT"
    component={Navigationp}
    options={{ title: 'PATIENT',headerTintColor: '#3c009d' }}
  />
</Stack.Navigator>
</NavigationContainer>

  );
};

export default App;

// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginSignup from './components/loginsignup';
import AuthScreen from './components/AuthScreen';
import Navigation from './components/navigation/navigation';
import Navigationp from './components/navigation-p/navigationpatient';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user, isLoading, restoreError, restoreSession } = useAuth();

  if (isLoading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color="#2D6A55" /></View>;
  }

  if (restoreError) {
    return (
      <View style={styles.loading}>
        <Text style={styles.restoreError}>{restoreError}</Text>
        <TouchableOpacity onPress={restoreSession}><Text style={styles.retry}>Try again</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={user ? `signed-in-${user.role}` : 'signed-out'}
        screenOptions={{
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: '#F7F8F3', elevation: 0, shadowOpacity: 0 },
          headerTintColor: '#29483B',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="WELCOME" component={LoginSignup} options={{ headerShown: false }} />
            <Stack.Screen name="AUTH" component={AuthScreen} options={{ headerShown: false }} />
          </>
        ) : user.role === 'patient' ? (
          <Stack.Screen name="PATIENT" component={Navigationp} options={{ title: 'My care' }} />
        ) : (
          <Stack.Screen name="COMPANION" component={Navigation} options={{ title: 'Companion space' }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: '#F7F8F3', alignItems: 'center', justifyContent: 'center', padding: 28 },
  restoreError: { color: '#A6463A', fontSize: 14, lineHeight: 21, textAlign: 'center' },
  retry: { color: '#2D6A55', fontWeight: '800', fontSize: 14, marginTop: 16 },
});

export default App;

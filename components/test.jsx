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
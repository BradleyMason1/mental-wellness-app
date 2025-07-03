import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Button } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import MoodLogScreen from './screens/MoodLogScreen';
import MoodSummaryScreen from './screens/MoodSummaryScreen';
import ResourceScreen from './screens/ResourceScreen';
import ReminderScreen from './screens/ReminderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 controls login flow

  return (
    <NavigationContainer>
      <Stack.Navigator>
  {!isLoggedIn ? (
    <Stack.Screen
      name="Login"
      options={{ headerShown: false }} // 👈 only hide for login
    >
      {(props) => (
        <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
      )}
    </Stack.Screen>
  ) : (
    <>

    
<Stack.Screen
  name="MoodLog"
  component={MoodLogScreen}
  options={({ navigation }) => ({
    title: 'Mood Log',
    headerRight: () => (
      <View style={{ flexDirection: 'row', gap: 8, paddingRight: 10 }}>
        <Button
          title="Summary"
          onPress={() => navigation.navigate('Summary')}
        />
        <Button
          title="Resources"
          onPress={() => navigation.navigate('Resources')}
        />
        <Button
          title="Reminders"
          onPress={() => navigation.navigate('Reminders')}
        />

      </View>
    )
  })}
/>
      <Stack.Screen name="Summary" component={MoodSummaryScreen} />
      <Stack.Screen name="Resources" component={ResourceScreen} />
      <Stack.Screen name="Reminders" component={ReminderScreen} />
    </>
  )}
      </Stack.Navigator>

    </NavigationContainer>
  );
}

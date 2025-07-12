import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Text } from 'react-native';
import { Provider as PaperProvider, Menu } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MoodLogScreen from './screens/MoodLogScreen';
import MoodSummaryScreen from './screens/MoodSummaryScreen';
import ResourceScreen from './screens/ResourceScreen';
import ReminderScreen from './screens/ReminderScreen';

const Stack = createNativeStackNavigator();

// 🔘 Hamburger menu component
function HeaderMenu({ navigation }) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Ionicons
          name="menu"
          size={28}
          color="#007AFF"
          onPress={openMenu}
          style={{ marginRight: 10 }}
        />
      }
    >
      <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Summary'); }} title="Summary" />
      <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Resources'); }} title="Resources" />
      <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Reminders'); }} title="Reminders" />
    </Menu>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {(props) => (
                  <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Register" options={{ title: 'Create Account' }}>
                {(props) => (
                  <RegisterScreen {...props} onLogin={() => setIsLoggedIn(true)} />
                )}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="MoodLog"
                component={MoodLogScreen}
                options={({ navigation }) => ({
                  title: 'Mood Log',
                  headerTitleAlign: 'center',
                  headerLeft: () => (
                    <View style={{ paddingLeft: 16 }}>
                      <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
                        <Text style={{ color: '#007AFF', fontWeight: '600' }}>Logout</Text>
                      </TouchableOpacity>
                    </View>
                  ),
                  headerRight: () => <HeaderMenu navigation={navigation} />
                })}
              />
              <Stack.Screen name="Summary" component={MoodSummaryScreen} />
              <Stack.Screen name="Resources" component={ResourceScreen} />
              <Stack.Screen name="Reminders" component={ReminderScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

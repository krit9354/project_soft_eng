import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Test from './test';
import HomeScreen from './home';
import { Text } from 'react-native';
import Slip from './slip';
const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Slip" component={Slip} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
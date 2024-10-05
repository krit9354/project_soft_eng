import { Slot } from 'expo-router';
import { SessionProvider } from '../components/ctx';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <SessionProvider>
            <View style={{paddingTop:Constants.statusBarHeight}} ></View>
            <Slot></Slot>
        </SessionProvider>
    );
}

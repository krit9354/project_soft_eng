import { Slot } from 'expo-router';
import { SessionProvider } from '../components/ctx';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <SessionProvider>
            <SafeAreaView>
                <Slot></Slot>
            </SafeAreaView>
        </SessionProvider>
    );
}

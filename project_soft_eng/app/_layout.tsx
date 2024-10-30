import { Slot } from 'expo-router';
import { SessionProvider } from '../components/ctx';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function Root() {
    const insets = useSafeAreaInsets();
    return (
        <SessionProvider>
                <Stack 
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    contentStyle: { paddingTop: insets.top , paddingBottom : insets.bottom , backgroundColor : "white"}
                }}/>
        </SessionProvider>
    );
}

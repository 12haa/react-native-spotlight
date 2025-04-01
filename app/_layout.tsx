import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import InitialLayout from '@/components/initialLayout';
import ClerkAndConvexProviders from './providers';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // This hook will protect routes from unauthenticated users

  return (
    <ClerkAndConvexProviders>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
      {/* <Slot /> */}
    </ClerkAndConvexProviders>
  );
}

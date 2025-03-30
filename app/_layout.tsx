import { ClerkProvider } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

// Get the publishable key from environment variables
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// SecureStore implementation for Clerk token storage
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// This handles the redirect back to your app after a successful sign in
WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();

  // This hook will protect routes from unauthenticated users
  const useProtectedRoute = (user: any) => {
    useEffect(() => {
      const inAuthGroup = segments[0] === '(auth)';

      if (!user && !inAuthGroup) {
        // If the user is not signed in and the initial segment is not in the auth group
        router.replace('/login');
      } else if (user && inAuthGroup) {
        // If the user is signed in and the initial segment is in the auth group
        router.replace('/(tabs)');
      }
    }, [user, segments]);
  };

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Slot />
    </ClerkProvider>
  );
}

import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

// Convert to a custom hook that returns a function
export default function useHandleLogin() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  // Return a function that can be called from the component
  return async () => {
    console.log('Login initiated');
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_google' });
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

// Convert to a custom hook that returns a function

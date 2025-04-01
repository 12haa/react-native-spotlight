import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function useHandleLogin() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  // Create a simple function that doesn't depend on state
  const handleLogin = async () => {
    console.log('Login initiated');
    try {
      // Wrap in setTimeout to break potential render cycles
      setTimeout(async () => {
        try {
          const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_google' });
          if (setActive && createdSessionId) {
            setActive({ session: createdSessionId });
            router.replace('/(tabs)');
          }
        } catch (err) {
          console.log('Login error in timeout:', err);
        }
      }, 100);
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return handleLogin;
}

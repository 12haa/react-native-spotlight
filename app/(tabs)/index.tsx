import { authStyles } from '@/styles/auth/authStyles';
import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={authStyles.container}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text
          style={{
            color: 'white',
          }}
        >
          SignOut
        </Text>
      </TouchableOpacity>
    </View>
  );
}

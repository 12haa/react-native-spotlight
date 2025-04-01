import { authStyles } from '@/styles/auth/authStyles';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  return (
    <View style={authStyles.container}>
      <Link
        href="/notifications"
        style={{
          backgroundColor: 'red',
          padding: 10, // Add padding for better touchable area
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginTop: 200 }}>
          Feed Screendasdasd
        </Text>
      </Link>
    </View>
  );
}

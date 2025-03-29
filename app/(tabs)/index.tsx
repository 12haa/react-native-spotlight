import { authStyles } from '@/styles/auth/authStyles';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  return (
    <View style={authStyles.container}>
      <Link
        href="/notifications"
        style={{
          // borderRadius: '5px',
          backgroundColor: 'blue',
          padding: 10,
          margin: 10,
          width: '80%',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Feed Screen in Tabs
      </Link>
    </View>
  );
}

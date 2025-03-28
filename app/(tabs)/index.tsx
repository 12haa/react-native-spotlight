import { authStyles } from '@/styles/auth/authStyles';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  return (
    <View style={authStyles.container}>
      <Link href="/(tabs)/index">Notifications</Link>
    </View>
  );
}

import { View, Text, Image } from 'react-native';
import React from 'react';
import { styles } from '@/styles/auth/authStyles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/theme';
import AuthBro from '../../assets/images/auth-bro.svg'; // Import SVG as a component

const LoginPage = () => {
  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>SpotLight</Text>
        <Text style={styles.tagline}>dont'miss anything</Text>
      </View>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../assets/images/authBro.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default LoginPage;

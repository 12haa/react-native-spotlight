import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '@/styles/auth/authStyles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/theme';
import useHandleLogin from '@/helpers/auth/handlerLogin';

const LoginPage = () => {
  // Use the custom hook to get the login handler function
  const handleLogin = useHandleLogin();

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
          resizeMode="cover"
        />
      </View>

      {/* Login Section */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => {
            console.log('clicked');
            handleLogin();
          }}
          activeOpacity={0.8}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={24} color="#8295F1" />
          </View>
          <Text style={styles.googleButtonText}>Continue With Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By Continuing, you agree to the terms and conditions and privacy policy.
        </Text>
      </View>
    </View>
  );
};

export default LoginPage;

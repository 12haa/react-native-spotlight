import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/theme';

const { width } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  // Create refs for each tab's animation
  const animatedValues = useRef(state.routes.map(() => new Animated.Value(0))).current;

  // Function to trigger pulse animation
  const animatePulse = (index: number) => {
    // Reset the animation value
    animatedValues[index].setValue(0);

    // Start the pulse animation
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Get icon name based on route name or from options
        let iconName: keyof typeof Ionicons.glyphMap | undefined;
        if (route.name === 'index') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'two') {
          iconName = isFocused ? 'list' : 'list-outline';
        } else if (route.name === 'three') {
          iconName = isFocused ? 'settings' : 'settings-outline';
        }
        // Add more routes as needed

        // Animation styles for the pulse effect
        const pulseScale = animatedValues[index].interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.3, 1],
        });

        const pulseOpacity = animatedValues[index].interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0.7, 0],
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }

              // Trigger animation when tab is pressed
              animatePulse(index);
            }}
            style={styles.tabButton}
          >
            {/* Pulse animation circle */}
            <Animated.View
              style={[
                styles.pulseCircle,
                {
                  transform: [{ scale: pulseScale }],
                  opacity: pulseOpacity,
                  backgroundColor: COLORS.primary,
                },
              ]}
            />

            {/* Tab icon */}
            <Ionicons name={iconName} size={24} color={isFocused ? COLORS.primary : COLORS.grey} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 80,
    paddingBottom: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 0,
    elevation: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pulseCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    zIndex: -1,
  },
});
export default CustomTabBar;

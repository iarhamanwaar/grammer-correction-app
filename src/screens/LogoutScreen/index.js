import React, { useState } from 'react';
import { View, StyleSheet, Alert, Animated } from 'react-native';
import { Button, Text, Surface, IconButton } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '../../utiles/firebase';
import { useAuth } from '../../context/AuthContext';
import { showMessage } from 'react-native-flash-message';

export default function LogoutScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      showMessage({
        message: 'You have been logged out successfully',
        type: 'success',
        floating: true,
      })
      await logout();
    } catch (error) {
      showMessage({
        message: error.message,
        type: 'error',
        floating: true,
      })
    } finally {
      setLoading(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: handleLogout,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
        <Surface style={styles.surface}>
          <IconButton
            icon="logout"
            size={60}
            iconColor="#FF4444"
            style={styles.icon}
          />
          <Text variant="headlineMedium" style={styles.title}>
            Goodbye!
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            We'll miss you! Are you sure you want to leave?
          </Text>
          
          <Button
            mode="contained"
            onPress={confirmLogout}
            style={styles.logoutButton}
            loading={loading}
            disabled={loading}
            buttonColor="#FF4444"
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Logout
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            disabled={loading}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Stay Here
          </Button>
        </Surface>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  animatedContainer: {
    width: '100%',
  },
  surface: {
    padding: 24,
    borderRadius: 16,
    elevation: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: '#FFF5F5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
    lineHeight: 24,
  },
  logoutButton: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 4,
  },
  cancelButton: {
    marginTop: 16,
    borderColor: '#666',
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

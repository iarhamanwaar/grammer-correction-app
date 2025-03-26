import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Surface } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utiles/firebase";
import { showMessage } from "react-native-flash-message";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
        showMessage({
            message: "Please fill in all fields",
            type: "error",
            floating: true,
        })
      return;
    }

    if (password !== confirmPassword) {
        showMessage({
            message: "Passwords do not match",
            type: "error",
            floating: true,
        })
      return;
    }

    if (password.length < 6) {
        showMessage({
            message: "Password should be at least 6 characters long",
            type: "error",
            floating: true,
        })
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showMessage({
            message: "Account Created! Please login.",
            type: "success",
            floating: true,
        })
      navigation.navigate("LoginScreen");
    } catch (error) {
      showMessage({
            message: error.message,
            type: "error",
            floating: true,
        })
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="headlineLarge" style={styles.title}>Create Account</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>Join us today!</Text>
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="lock" />}
        />
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="lock-check" />}
        />
        
        <Button 
          mode="contained" 
          onPress={handleRegister}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Sign Up
        </Button>
        
        <Button 
          mode="text" 
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.linkButton}
        >
          Already have an account? Sign In
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'white'
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a237e'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666'
  },
  input: { 
    marginBottom: 16,
    backgroundColor: 'white'
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: '#1a237e'
  },
  linkButton: {
    marginTop: 16
  }
});

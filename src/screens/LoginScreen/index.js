import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { TextInput, Button, Text, Surface } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utiles/firebase";
import { useAuth } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
            message: "Please fill in all fields",
            type: "error",
            floating: true,
        })
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      await login(token);
      showMessage({
        message: "Login Successful!",
        type: "success",
        floating: true,
      })
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
        <Text variant="headlineLarge" style={styles.title}>Welcome Back!</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>Please sign in to continue</Text>
        
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
        
        <Button 
          mode="contained" 
          onPress={handleLogin}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Sign In
        </Button>
        
        <Button 
          mode="text" 
          onPress={() => navigation.navigate("SignupScreen")}
          style={styles.linkButton}
        >
          Don't have an account? Sign Up
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

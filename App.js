import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { useFonts } from 'expo-font';
import { MMKV } from "react-native-mmkv";
import * as SplashScreen from 'expo-splash-screen';
import ApplicationNavigator from "./src/navigator/Application";
import { AuthProvider } from "./src/context/AuthContext";


const App = () => {
    const storageKey = new MMKV();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <View style={styles.container}>
        {/* <Text style={styles.text}>Hello World!</Text> */}
        <ApplicationNavigator />
        <FlashMessage position="top" /> 
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});

export default App;

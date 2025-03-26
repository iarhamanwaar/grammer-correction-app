import { useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import MainStackScreen from "./MainStackScreen";
import AuthStackScreen from "./AuthStackScreen";

const Stack = createStackNavigator();

function ApplicationNavigator() {
  const navigationRef = useRef(null);
  const routeNameRef = useRef(null);
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {accessToken ? (
          <Stack.Screen name="MainStackScreen" component={MainStackScreen} />
        ) : (
          <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;

import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const Auth = createStackNavigator();

function AuthStackScreen(props) {
  return (
    <Auth.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"LoginScreen"}
    >
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="SignupScreen" component={RegisterScreen} />
    </Auth.Navigator>
  );
}

export default AuthStackScreen;

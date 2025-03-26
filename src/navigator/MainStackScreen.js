import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";

const MainStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TabNavigation">
      <MainStack.Screen name="TabNavigation" component={TabNavigation} />
    </MainStack.Navigator>
  );
}

export default MainStackScreen;

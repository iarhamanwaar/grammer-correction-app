import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import GrammarCheckScreen from '../screens/GrammerCheckScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="GrammarCheckScreen"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#1a237e',
        tabBarInactiveTintColor: '#ABABAB',
        headerShown: false,
      }}>
      <Tab.Screen
        name="GrammarCheckScreen"
        component={GrammarCheckScreen}
        options={{
          title: 'Grammar Check',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="spellcheck" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{
          title: 'Logout',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    height: 70,
    paddingTop: 5,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'SF-Pro-Rounded-Semibold',
  }
});

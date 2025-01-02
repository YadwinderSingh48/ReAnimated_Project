import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootStackNavigation from './App/Navigation/RootStack';

export default function App() {
  return (
    <NavigationContainer>
    <StatusBar />
      <RootStackNavigation />
    </NavigationContainer>
  );
}

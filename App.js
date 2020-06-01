import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MainPage from './screen/MainPage';
import OTPPage from './screen/OTPPage'
import TrackPage from './screen/TrackPage'
import MenuPage from './screen/MenuPage'
import HistoryPage from './screen/HistoryPage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
     <PaperProvider>
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={MainPage} />
        <Drawer.Screen name="OTP" component={OTPPage} />
        <Drawer.Screen name="TrackPage" component={TrackPage} />
        <Drawer.Screen name="MenuPage" component={MenuPage} />
        <Drawer.Screen name="HistoryPage" component={HistoryPage} />
      </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

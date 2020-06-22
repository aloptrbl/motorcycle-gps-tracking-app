import React from 'react';
import {Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuPage from './screen/MenuPage';
import TrackPage from './screen/TrackPage';
import HistoryPage from './screen/HistoryPage';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MenuPage' options={{ header: () => null }} component={MenuPage} />
      <Stack.Screen name='TrackPage' options={{  headerTitle: "Track Location", headerTintColor: '#fff', headerTitleAlign: 'center', headerStyle: {
            backgroundColor: '#0275d8',
          }, }} component={TrackPage} />
      <Stack.Screen name='HistoryPage' options={{ headerTitle: "Location History", headerTintColor: '#fff', headerTitleAlign: 'center', headerStyle: {
            backgroundColor: '#0275d8',
          }, }} component={HistoryPage} />
    </Stack.Navigator>
  );
}
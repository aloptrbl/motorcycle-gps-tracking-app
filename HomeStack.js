import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuPage from './screen/MenuPage';
import TrackPage from './screen/TrackPage';
import HistoryPage from './screen/HistoryPage';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MenuPage' options={{ header: () => null }} component={MenuPage} />
      <Stack.Screen name='TrackPage' options={{ header: () => null }} component={TrackPage} />
      <Stack.Screen name='HistoryPage' options={{ header: () => null }} component={HistoryPage} />
    </Stack.Navigator>
  );
}
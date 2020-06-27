import React, {useContext, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './Routes';
import Firebase, { FirebaseContext } from './firebase';
export default function App() {
  const { user, setUser } = useState(false);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const firebase = new Firebase();
  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];


  return (
     <PaperProvider>
     <FirebaseContext.Provider value={new Firebase()}>
      <Routes />
      </FirebaseContext.Provider>
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

import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {Text, Button} from 'react-native-paper';

const MainPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header} theme={{fonts: 'medium'}}>MOTORCYCLE
      GPS
      TRACKER</Text>
    <Text>Enter Mobile Number & Login</Text>
    <View>
    <TextInput 
    placeholder="Mobile No"
    keyboardType="number-pad"
    style={styles.textInput}
    />
    </View>
    
       <Button color="black" mode="contained" onPress={() => console.log('Pressed')}>
    Login
  </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85b2e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 45,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    margin: 25,
    height: 40,
    width: 200,
    paddingRight: 5,
    backgroundColor: 'white'
  }
});

export default MainPage;

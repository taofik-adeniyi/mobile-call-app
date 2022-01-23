import {View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Voximplant } from 'react-native-voximplant';
import { APP_NAME, ACC_NAME } from '../../constants'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation()

  const voximplant = Voximplant.getInstance();

  const redirectHome = () => {
      navigation.reset({
          index: 0,
          routes: [{
              name: 'Contacts'
          }]
      })
  }

  const signIn = async () => {
      try {
          const voxUserName = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`
          await voximplant.login(voxUserName, password)
          redirectHome()
      } catch (error) {
        console.log(error);
        Alert.alert(error.name, `Error code: ${error.code}`)          
      }
  };

  const connect = async () => {
      const status = await voximplant.getClientState()
      console.log(status)
      if(status === Voximplant.ClientState.DISCONNECTED) {
          await voximplant.connect()
      } else if (status === Voximplant.ClientState.LOGGED_IN){
          redirectHome()
      }
  }

  useEffect(() => {
    connect()
  }, [])

  return (
    <View style={styles.page}>
      <Text>Login To my Call</Text>
      <TextInput
        placeholder="username"
        style={styles.input}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput onChangeText={setPassword} placeholder="username" style={styles.input} secureTextEntry />
      <Pressable style={styles.btn} onPress={signIn}>
        <Text style={styles.btnText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
  },
  btn: {
    backgroundColor: 'dodgerblue',
    marginVertical: 10,
    alignItems: 'center',
    padding: 15,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default LoginScreen;

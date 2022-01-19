import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

const LoginScreen = () => {
    const [username, setUsername] = useState()
    const [password, setPasword] = useState()

    const signIn = () => {
        console.warn(username)
    }

  return (
    <View style={styles.page}>
      <Text>Login</Text>
      <TextInput placeholder="username" style={styles.input} onChangeText={setUsername} />
      <TextInput placeholder="username" style={styles.input} secureTextEntry />
      <Pressable style={styles.btn} onPress={signIn}><Text style={styles.btnText}>Sign in</Text></Pressable>
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
        padding: 10
    },
    btn: {
        backgroundColor: 'dodgerblue',
        marginVertical: 10,
        alignItems: 'center',
        padding: 15,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    }
})
export default LoginScreen;

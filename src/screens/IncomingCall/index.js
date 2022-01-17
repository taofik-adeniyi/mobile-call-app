import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground, Pressable, Alert} from 'react-native';
import wallbg from '../../../assets/images/incomingbg.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const IncomingCall = () => {
    const onAccept = () => {
        console.warn('accept')
        Alert.alert('title', 'on accept press')
    }
    const onDecline = () => {
        console.warn('decline')
    }
  return (
    <View style={styles.root}>
      {/* <Image source={wallbg} style={styles.bg} resizeMode="cover" /> */}
      <ImageBackground source={wallbg} style={styles.bg} resizeMode="cover">
        <Text style={styles.name}>Abidemi</Text>
        <Text style={styles.phoneNumber}>Video call ...</Text>

        <View style={[styles.row, {marginTop: 'auto'}]}>
            <View style={styles.iconsContainer}>
                <Ionicons size={30} color={'white'} name="alarm" />
                <Text style={styles.iconsText}>Remind me</Text>
            </View>
            <View style={styles.iconsContainer}>
            <Entypo size={30} color={'white'} name="message" />

                <Text style={styles.iconsText}>Message</Text>
            </View>
        </View>

        <View style={[styles.row, {marginBottom: 30}]}>
            <Pressable onPress={onDecline} style={styles.iconsContainer}>
                <View style={styles.iconsButtonContainer}>
                <Feather size={40} color={'white'} name="x" />
                </View>
                <Text style={styles.iconsText}>Decline</Text>
            </Pressable>
            <Pressable onPress={onAccept} style={styles.iconsContainer}>
            <View style={[styles.iconsButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather size={40} color={'white'} name="check" />
            </View>
                <Text style={styles.iconsText}>Accept</Text>
            </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 100,
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 18,
    color: '#ddd',
  },
  bg: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconsContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  iconsText: {
    color: '#fff',
  },
  iconsButtonContainer: {
      padding: 10,
      borderRadius: 50,
      backgroundColor: 'red',
      margin: 10
  }
});

export default IncomingCall;

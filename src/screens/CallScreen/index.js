import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import CallActionBox from '../../comps/callAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/core';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false)
  const navigation = useNavigation();
  const route = useRoute();

  const user = route?.params?.user;

  const goBack = () => {
    navigation.pop();
  };

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const recordAudioGranted =
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
    const cameraGranted =
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
    if (!cameraGranted || !recordAudioGranted) {
      Alert.alert('Permissions not granted');
    } else {
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions();
    } // not required for ios
    else{
      setPermissionGranted(true);
    }
  }, []);

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.goBack}>
        <Ionicons name="chevron-back" color="white" size={30} />
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>ringing +234 8171 633 912</Text>
      </View>

      <CallActionBox />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
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
  goBack: {
    position: 'absolute',
    top: 60,
    left: 20,
    // marginTop: 100,
    zIndex: 10,
  },
});

export default CallScreen;

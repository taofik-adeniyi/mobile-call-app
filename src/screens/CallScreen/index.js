import React, {useEffect, useState, useRef} from 'react';
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
import {Voximplant} from 'react-native-voximplant';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callState, setCallState] = useState('Initializing ...');
  const navigation = useNavigation();
  const route = useRoute();
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  const {user, call: incomingCall, isIncomingCall} = route?.params;

  const voximplant = Voximplant.getInstance();
  const call = useRef(incomingCall);
  const endpoint = useRef(null);

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
    else {
      setPermissionGranted(true);
    }
  }, []);

  const callSettings = {
    video: {
      sendVideo: true,
      receiveVideo: true,
    },
  };

  const makeCall = async () => {
    call.current = await voximplant.call(user.user_name, callSettings);
    console.log(call.current);
    subscribeToCallEvents();
  };

  const answerCall = async () => {
    subscribeToCallEvents();
    endpoint.current = call.current.getEndpoints()[0];
    subscribeToEndpointEvent();
    call.current.answer(callSettings);
  };

  const showError = async reason => {
    Alert.alert('Call failed', `Reason: ${reason}`, [
      {
        text: 'OK',
        onPress: navigation.navigate('Contacts'),
      },
    ]);
  };

  const subscribeToCallEvents = () => {
    call.current.on(Voximplant.CallEvents.Failed, callEvent => {
      showError(callEvent.reason);
    });
    call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
      setCallState('Calling ...');
    });
    call.current.on(Voximplant.CallEvents.Connected, callEvent => {
      setCallState('Connected');
    });
    call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
      navigation.navigate('Contacts');
    });
    call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callEvent => {
      setLocalVideoStreamId(callEvent.videoStream.id);
    });
    call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
      endpoint.current = callEvent.endpoint;
      subscribeToEndpointEvent();
    });
  };

  const subscribeToEndpointEvent = async () => {
    endpoint.current.on(
      Voximplant.EndpointEvents.RemoteVideoStreamAdded,
      endpointEvent => {
        setRemoteVideoStreamId(endpointEvent.videoStream.id);
      },
    );
  };

  const hangUp = () => {
    call.current.hangup();
  };

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    if (isIncomingCall) {
      answerCall();
    }
    makeCall();

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted]);

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.goBack}>
        <Ionicons name="chevron-back" color="white" size={30} />
      </Pressable>

      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={styles.remoteVideo}
      />

      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        style={styles.localVideo}
      />

      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>{callState}</Text>
      </View>

      <CallActionBox hangUp={hangUp} />
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
  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: '#ffff6e',
    position: 'absolute',
    top: 140,
    right: 20,
    borderRadius: 10,
  },
  remoteVideo: {
    backgroundColor: '#7b4e80',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    borderRadius: 10,
  },
});

export default CallScreen;

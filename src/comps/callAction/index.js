import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallActionBox = ({hangUp}) => {
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMichOn, setIsMichOn] = useState(true)

  const onReverseCamera = () => {}

  const onToggleCamera = () => {
    setIsCameraOn(currentValue => !currentValue)
  }

  const onToggleMicrophone = () => {
    setIsMichOn(currentValue => !currentValue)
  }

  const onHangup = () => {}

    return (
        <View style={styles.btnContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable onPress={onReverseCamera} style={styles.iconBtn}>
            <Ionicons name="ios-camera-reverse" size={30} color={'white'} />
          </Pressable>
          <Pressable onPress={onToggleCamera} style={styles.iconBtn}>
            <MaterialIcons name={isCameraOn ? "camera-off": "camera"} size={30} color={'white'} />
          </Pressable>
          <Pressable onPress={onToggleMicrophone} style={styles.iconBtn}>
            <MaterialIcons name={isMichOn ? "microphone-off": "microphone"} size={30} color={'white'} />
          </Pressable>
          <Pressable onPress={hangUp} style={[styles.iconBtn, {backgroundColor: 'red'}]}>
            <MaterialIcons name="phone-hangup" size={30} color={'white'} />
          </Pressable>
        </View>
        {/* <View style={{width: '50%', alignSelf: 'center', marginTop: 20, height: 5, backgroundColor: 'lightgray'}} /> */}
      </View>
    )
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#333333',
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  iconBtn: {
    backgroundColor: '#4a4a4a',
    padding: 10,
    borderRadius: 50,
  },
})
export default CallActionBox

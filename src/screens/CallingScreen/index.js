import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CallActionBox from '../../comps/callAction'

const CallingScreen = () => {
    return (
        <View style={styles.page}>
            <View style={styles.cameraPreview}></View>
            <View style={{marginTop: 'auto'}}>
            <CallActionBox />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: '#7b4e80',
      },
      cameraPreview: {
        width: 100,
        height: 150,
        backgroundColor: '#ffff6e',
        position: 'absolute',
        top: 140,
        right: 20,
        borderRadius: 10,
      },
})
export default CallingScreen

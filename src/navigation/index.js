import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CallScreen from '../screens/CallScreen';
import ContactScreen from '../screens/Contacts';
import CallingScreen from '../screens/CallingScreen';
import IncomingCall from '../screens/IncomingCall';


const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Contacts'}>
                <Stack.Screen name="Contacts" component={ContactScreen} />
                {/* <Stack.Screen name="CallingScreen" component={CallingScreen} options={{headerShown: false}} />
                <Stack.Screen name="CallScreen" component={CallScreen} options={{headerShown: false}} />
                <Stack.Screen name="IncomingCall" component={IncomingCall} options={{headerShown: false}} /> */}
                <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="CallingScreen" component={CallingScreen} />
                <Stack.Screen name="CallScreen" component={CallScreen}  />
                <Stack.Screen name="IncomingCall" component={IncomingCall}  />
                </Stack.Group>
            </Stack.Navigator>
         </NavigationContainer>
    )
}
export default Navigation

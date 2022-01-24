import React, { useState, useEffect } from 'react';
import {Text, View, FlatList, StyleSheet, TextInput, Pressable} from 'react-native';
import contactsData from '../../../assets/data/contacts.json';
import { useNavigation } from '@react-navigation/core'
// this should be moved into App.js files
import { Voximplant } from 'react-native-voximplant'

const ContactScreen = () => {
  const [searchText, setSearchText] = useState('')
  const [contacts, setContact] = useState(contactsData)
  
  const navigation = useNavigation()
  const voximplant = Voximplant.getInstance()

    useEffect(() => {
      voximplant.on(Voximplant.ClientEvents.IncomingCall, (inComingCallEvent) => {
        navigation.navigate('IncomingCall', {
          call: inComingCallEvent.call
        })
      })
      return () => {
        voximplant.off(Voximplant.ClientEvents.IncomingCall)
      }
    }, [])

    useEffect(() =>{
        
            const newContacts = contactsData.filter(
                contact => contact.user_display_name.toLocaleLowerCase().includes(searchText.toLowerCase())
                )
            setContact(newContacts)
    }, [searchText])

    const callUser = (user) => {
      // console.warn('user call')
      navigation.navigate('CallScreen', {user})
    }
  return (
    <View style={styles.page}>
      <TextInput value={searchText} onChangeText={setSearchText} style={styles.searchInput} placeholder="Search...." />
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <Pressable onPress={()=>callUser(item)}>
            <Text style={styles.contactName}>{item.user_display_name}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 15,
    flex: 1,
    backgroundColor: 'white'
  },
  contactName: {
    fontSize: 16,
    marginVertical: 10,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
});
export default ContactScreen;

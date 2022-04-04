import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileElement from "../Components/ProfileElement";
import DementiaProfileElement from '../Components/DementiaProfileElement';

const Profile = () => {
  const [userData, setuserData] = useState(null);
  const isFocused = useIsFocused()
  useEffect(() => {
    AsyncStorage.getItem('user', (err, item) => { setuserData(JSON.parse(item)) })


  }, [isFocused]);

  if (userData == null) {
    return (
      <View>
        <Text>loading</Text>
        </View>
    )}
    if(userData.type=="guardian")
{  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <View style={styles.items}>
          <View style={styles.item}>
            <Text>Name :{userData.name}</Text>
            <Text>Email :{userData.email}</Text>
          </View>
        </View>
      </View>
      <Text>Your Dementia :</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
        <DementiaProfileElement  userData={userData}/>
        </View>

        <View style={styles.fixToText}>
    
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateProfile');
            }}
            style={styles.donebutton}
          >
            <Text >Update Your Profile </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );}
  else{
  return (
    <View style={styles.container}>
   
      <Text>Your Dementia :</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
        <DementiaProfileElement  userData={userData}/>
        </View>

        <View style={styles.fixToText}>
    
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateProfile');
            }}
            style={styles.donebutton}
          >
            <Text >Update Your Profile </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );}
};

const styles = StyleSheet.create({
  items: {
    padding: "5%",
  },
  item: {
    margin: "1%",
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 0,
  },
  container: {
    flex: 1,
  },
  sectionTitle: {
    margin: "5%",
    marginLeft: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  scrollView: {
    marginHorizontal: 5,
  },
  square: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignSelf: "center",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 8,
  },
  backarrow: {
    paddingLeft: 50,
    paddingTop: 50,
    shadowColor: "#D86363",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 6,
  },
  deletebutton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#D86363",
    backgroundColor: "#fff",
    shadowColor: "#D86363",
    shadowOpacity: 0.2,
    shadowRadius: 1.22,
    elevation: 11,
  },
  donebutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#093F38",
    backgroundColor: "#fff",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin:"5%",
    paddingLeft: "25%",
    marginRight: "25%",
  },
});
export default Profile
import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileElement from "../Components/ProfileElement";
import DementiaProfileElement from '../Components/DementiaProfileElement';

const ProfileGuardian = () => {
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
    )
  }
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#359A8E", flex: 1, borderBottomLeftRadius: 60, borderBottomEndRadius: 20 }}>
        <Image>

        </Image>
      </View>
      <Text style={styles.title}>Your informations :</Text>
        <View style={styles.items}>
          <Text style={styles.subtitle}>Name</Text><Text style={styles.sectionTitle}>{userData.name}</Text>
          <Text style={styles.subtitle}>Email</Text><Text style={styles.sectionTitle}>{userData.email}</Text>
        </View>
      <Text style={styles.title}>Your Dementia informations:</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
          <DementiaProfileElement userData={userData} />
        </View>

        <View style={styles.fixToText}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('UpdateNote', { el: route.params.el }); }}
            style={styles.donebutton}>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </View>
  );
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
  title: {
    fontSize: 24,
    color: "#359A8E",
    marginLeft: "1%",

  },
  subtitle: {
    fontSize: 20,
    color: "#00000090",
    marginLeft: "1%",

  },
  sectionTitle: {
    margin: "2%",
    marginLeft: "5%",
    fontSize: 24,
    textDecorationLine: 'underline'

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
    justifyContent: "flex-end",
    margin: "5%",
  },
});
export default ProfileGuardian
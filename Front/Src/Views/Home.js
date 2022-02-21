import { View,Text,Button, StyleSheet,SafeAreaView,StatusBar,Image,TextInput } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';

const Home = ({ navigation }) => {
  return (  
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection:'row',margin:10,marginTop:20}}>      
        <Image source={require('./../../assets/profile.png')} style={{width:150,height:150,borderRadius:40/ 2 }}></Image>
        <View style={{justifyContent:'center',alignItems:'flex-end',marginLeft:10,height:100}}>
          <Text style={styles.Title}>Welcome Alex Ten Napel</Text>
          <Text style={styles.Title}>Your age is 80</Text></View>

      </View>
     <View style={styles.searchSection}>
    <Icon style={styles.searchIcon} name="search" size={20} color="#000"/>
    <TextInput
        style={styles.input}
        placeholder="User Nickname"
        onChangeText={(searchString) => {this.setState({searchString})}}
        underlineColorAndroid="transparent"
    />
</View>
      <View style={styles.imageLink} >
      <View style={{alignItems:'center'}}>
          <Image source={require('./../../assets/Contact.png')} style={{    width:180,height:280,borderRadius:40/ 2,marginTop:10 }}></Image>
          <Text style={styles.Title2}>Contact</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Image source={require('./../../assets/map.png')} style={{    width:180,height:200,borderRadius:60/ 2 ,marginTop:10,marginLeft:10}}></Image>
        <Text style={styles.Title2}>Location</Text>

</View>



      </View>
      
      <View style={styles.imageLink} >
      <View style={{alignItems:'center'}}>
      <Image source={require('./../../assets/profile.png')} style={{    width:180,height:200,borderRadius:40/ 2,marginTop:80 }}></Image>
      <Text style={styles.Title2}>History</Text>

</View>
<View style={{alignItems:'center'}}>
      <Image source={require('./../../assets/Note.png')} style={{    width:180,height:280,borderRadius:40/ 2 ,marginTop:10,marginLeft:10}}></Image>
      <Text style={styles.Title2}>Notes</Text>

</View>

      </View>
     {/* <Button
      title="Go check my demantia location"
      onPress={() =>
        navigation.navigate('CheckDemantiaLocation')
      }
    />
     <Button
      title="Go my location"
      onPress={() =>
        navigation.navigate('DemantiaLocation')
      }
    /> */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
        alignItems:'center'
    },
    Title: {
      fontWeight: 'bold',
      fontSize:20,
    },
    Title2: {
      fontWeight: 'bold',
      fontSize:18,
    },
    searchSection: {

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  searchIcon: {
      padding: 10,
      color:'red'
    },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
  imageLink:{

    flexDirection:'row',
    height:250
  },
  }
    );
    
export default Home
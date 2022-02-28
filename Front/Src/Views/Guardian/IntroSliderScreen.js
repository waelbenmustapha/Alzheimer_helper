import {StatusBar, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'


const IntroSliderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alzheimer Helper</Text>
  
      <View style={styles.container}>
          <Swiper style={styles.wrapper}  loop={false} index={0} >

    
          <View style={styles.slide1}>
          <Image 
           source={require("./../../../assets/old.png")} style={styles.image}
           
/> 
            <Text style={styles.title2}>Understanding </Text>
            <Text style={styles.text}>Alzheimer's is the most common form of dementia. It causes problems with memory, thinking and behavior.</Text>
 </View>

      <View style={styles.slide1}>
      <Image 
           source={require("./../../../assets/old.png")} style={styles.image}
           
/> 
      <Text style={styles.title2}>Help </Text>
            <Text style={styles.text}>You are not alone. Whether you are living with Alzheimer's or caring for someone with the disease.</Text>
 </View>
 



<View style={styles.slide1}>
<Image 
           source={require("./../../../assets/old.png")} style={styles.image}
           
/> 
<Text style={styles.title2}>Support </Text>
            <Text style={styles.text}>The first supervisor of Alzheimer's is out her, we won't let you alone.</Text>
 </View>
 <View style={styles.slide1}>
      <Image 
           source={require("./../../../assets/old.png")} style={styles.image}
           
/> 
<View style={{flex:1,flexDirection:'row'}}>
<TouchableOpacity style={styles.buttonG}     onPress={() =>
        navigation.navigate('SignUpGuardian')
      }><Text style={styles.titlebutton}>Guardien</Text></TouchableOpacity>
<TouchableOpacity style={styles.buttonD}     onPress={() =>
        navigation.navigate('SignupDementia')
      }><Text style={styles.titlebutton}>Alzheimer' Dementia</Text></TouchableOpacity>

</View>

      </View>
</Swiper>
{/* <TouchableOpacity style={styles.button}><Text style={styles.titlebutton}>Login</Text></TouchableOpacity> */}

    </View>
</View>
  
  
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',




    marginTop:StatusBar.currentHeight

  },

  title:{
    color:"#359A8E",
    fontSize:28,
    paddingLeft:'2%',
    paddingTop:'2%',

  },
  title2:{
    padding:'2%',

    color:"#4A0D66",
    fontSize:28,

  },
  
  wrapper: {          

  },
  titlebutton:{
    color:"#ffff",
    fontSize:18,
  },
  buttonG: {

    alignItems: "center",
    justifyContent:'center',
    backgroundColor: "#4A0D66",
    padding:20,
    width:'40%',
    height:'45%',
    margin:'5%',
    borderRadius:40
  },
  buttonD: {

    alignItems: "center",
    justifyContent:'center',
    backgroundColor: "#359A8E",
    padding:20,
    width:'40%',
    height:'45%',
    marginTop:'5%',
    marginRight:'5%',
    marginBottom:'5%',
    borderRadius:40
  },

  slide1: {
    flex: 1 ,
    alignItems: 'center',
      
  },

  image: {
    
    height:'70%',
    width:'100%',


      
  },
  slide2: {
    flex: 1,
    alignItems: 'flex-end',
  },
  slide3: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    color: '#359A8E',
    fontSize: 18,
    textAlign:'center',
    paddingTop:'2%',
    paddingBottom:'5%',

    paddingLeft:'10%',
    paddingRight:'10%'

  }
})

export default IntroSliderScreen

   
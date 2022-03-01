import {StatusBar, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'


const IntroSlider = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
          <Swiper style={styles.wrapper}  loop={false} index={0} >

    
<View style={styles.slide1}>

<Image 
           source={require("./../../../assets/lvl14.png")} style={styles.image}
           
/> 
<View>
<Text style={styles.text} >"Précoce"</Text>

 <Text style={styles.text} >Stade 1,2 et 3 : c’est la partie lors le malade utilise la version de l’application mobile avec le contrôle de leur gardien(ne).</Text>

</View>

      </View>

<View style={styles.slide1}>
 <Image
           source={require("./../../../assets/lvl56.png")} style={styles.image}
/>
    <View>
    <Text style={styles.text} >"Intermediare"</Text>

 <Text style={styles.text} >Stade 4 et 5 : c’est la partie lors le malade utilise la version de l’application mobile avec la smartwatch liée avec le contrôle de leurs gardien(ne).</Text>

</View>

</View>

<View style={styles.slide1}>
 <Image
           source={require("./../../../assets/lvl7.png")} style={styles.image}
/>     
    <View>
    <Text style={styles.text} >"Avancé"</Text>

 <Text style={styles.text} >Stade 6 et 7 “avancé”: c’est la partie lors le malade utilise la smartwatch avec le contrôle de leur gardien(ne).</Text>

</View>

</View>
</Swiper>
<TouchableOpacity style={styles.button}     onPress={() =>
        navigation.navigate(route.params.signup)
      }><Text style={styles.titlebutton}>SignUp</Text></TouchableOpacity>

    </View>

  
  
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',



    marginTop:StatusBar.currentHeight

  },
  wrapper: {          

  },
  titlebutton:{
    color:"#ffff",
    fontSize:22,
  },
  button: {
    alignItems: "center",

    backgroundColor: "#4A0D66",
    padding:20,
    width:'33%',
    margin:'5%',
    borderRadius:40
  },

  slide1: {
    flex: 1,
    alignItems: 'center',
    borderRadius:300,
    backgroundColor:'#ffff',
      
  },
  bar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    
    height:'70%',
    width:'100%'

      
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
    marginLeft:30,
    marginEnd:30,
    padding:5
  }
})

export default IntroSlider

   
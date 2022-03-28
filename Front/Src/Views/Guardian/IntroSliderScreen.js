import { StatusBar, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'


const IntroSliderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.container}>

        <ImageBackground
          source={require("./../../../assets/old.png")} style={styles.image}
        >
          <Text style={styles.title}>Alzheimer Helper</Text>

          <Swiper style={styles.wrapper} loop={false} index={0} >

            <View style={styles.slide1}>
              <Text style={styles.title2}>Understanding </Text>
              <Text style={styles.text}>Alzheimer's is the most common form of dementia. It causes problems with memory, thinking and behavior.</Text>
            </View>

            <View style={styles.slide1}>
              <Text style={styles.title2}>Help </Text>
              <Text style={styles.text}>You are not alone. Whether you are living with Alzheimer's or caring for someone with the disease.</Text>
            </View>

            <View style={styles.slide1}>
              <Text style={styles.title2}>Support </Text>
              <Text style={styles.text}>The first supervisor of Alzheimer's is out her, we won't let you alone.</Text>
            </View>


            <View style={styles.slide2}>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={styles.buttonG} onPress={() =>
                  navigation.navigate('IntroSlider', { 'signup': 'SignUpGuardian' })
                }><Text style={styles.titlebutton}>Guardien</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonD}
                  onPress={() => navigation.navigate('IntroSlider', { 'signup': 'SignupDementia' })}>
                  <Text style={styles.titlebutton}>Alzheimer' Dementia</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swiper>
        </ImageBackground>

        {/* <TouchableOpacity style={styles.button}><Text style={styles.titlebutton}>Login</Text></TouchableOpacity> */}

      </View>
    </View>


  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: StatusBar.currentHeight
  },

  title: {
    color: "#359A8E",
    fontSize: 28,
    padding: "5%",
    backgroundColor:"#ffffff70"

  },

  title2: {
    padding: '2%',
    color: "#4A0D66",
    fontSize: 28,
  },

  titlebutton: {
    color: "#ffff",
    fontSize: 18,
  },
  buttonG: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#4A0D66",
    width: "100%",
    height: '10%',
    margin: '2%',
    borderRadius: 20
  },
  buttonD: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#359A8E",
    width: "100%",
    height: '10%',
    margin: '2%',
    borderRadius: 20
  },

  slide1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
backgroundColor:"#ffffff70"
  },

  image: {
    height: '100%',
    width: '100%',

  },
  slide2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: "center",
    paddingBottom: "15%",
    backgroundColor:"#ffffff70"

  },
  slide3: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    color: '#359A8E',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: "15%",
    paddingLeft: "8%",
    paddingRight: "8%"

  }
})

export default IntroSliderScreen


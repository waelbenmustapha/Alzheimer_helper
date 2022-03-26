import { StatusBar, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'


const IntroSlider = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} loop={false} index={0} >


        <View style={styles.slide1}>

          <Image
            source={require("./../../../assets/lvl14.png")} style={styles.image}

          />
          <View>
            <Text style={styles.text1} >"Precocious"</Text>

            <Text style={styles.text2} >Stage 1,2 and 3: This is the part when the patient uses the version of the mobile application with the control of their guardian.</Text>
          </View>

        </View>

        <View style={styles.slide1}>
          <Image
            source={require("./../../../assets/lvl56.png")} style={styles.image}
          />
          <View>
            <Text style={styles.text1} >"Intermediate"</Text>

            <Text style={styles.text2} >Stage 4 and 5: This is the part when the patient uses the version of the mobile application with the smartwatch linked with the control of their guardian.</Text>
          </View>

        </View>

        <View style={styles.slide1}>
          <Image
            source={require("./../../../assets/lvl7.png")} style={styles.image}
          />
          <View>
            <Text style={styles.text1} >"Advanced"</Text>

            <Text style={styles.text2} >Stage 6 and 7: This is the part when the patient uses the smartwatch with the control of their guardian.</Text>
          </View>

        </View>
      </Swiper>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.push(route.params.signup)}>
        <Text style={styles.titlebutton}>SignUp</Text>
      </TouchableOpacity>

    </View>



  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',



    marginTop: StatusBar.currentHeight

  },
  wrapper: {

  },
  titlebutton: {
    color: "#ffff",
    fontSize: 22,
  },
  button: {
    alignItems: "center",

    backgroundColor: "#4A0D66",
    padding: 20,
    width: '33%',
    margin: '5%',
    borderRadius: 20
  },

  slide1: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 300,
    backgroundColor: '#ffff',

  },
  bar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {

    height: '70%',
    width: '100%'


  },
  slide2: {
    flex: 1,
    alignItems: 'flex-end',
  },
  slide3: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text1: {
    color: '#359A8E',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 30,
    marginEnd: 30,
    padding: 5
  },
  text2: {
    color: '#359A8E',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 30,
    marginEnd: 30,
    padding: 5
  }
})

export default IntroSlider


import React, { useEffect, createRef, useState, hasError } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "../Utils/Notif";

const SignIn = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");

  const [Data, setData] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log(token);
      setExpoPushToken(token);
    });
  }, []);
  const _removeValue = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        await AsyncStorage.removeItem("user");
      }
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("token", expoPushToken);
      AsyncStorage.setItem("user", JSON.stringify(Data)).then((value) => {
        if (Data.type == "dementia") {
          navigation.replace("Home");
          return;
        }
        if (Data.pinCode == null) {
          navigation.replace("PinCode");
          return;
        }
        navigation.replace("PinCodeVerif");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPress = async (event) => {
    if (!userEmail.trim() || !userPassword.trim()) {
      alert("Please fell Email or Password");

      return;
    }
    setIsLoading(true);
    axios
      .post(encodeURI(`https://alzhelper.herokuapp.com/auth/login/${expoPushToken}`), {
        email: userEmail,
        password: userPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          _storeData();

          console.log("singin data " + JSON.stringify(Data));
          console.log("done");
        }
      })
      .catch((error) => {
        console.log("ell error " + error);
        alert("Email or Password is wrong ");
        setIsLoading(false);
      });
  };

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#5f0a87", "#a4508b"]}
      style={styles.container}
      end={{ x: 0.8, y: 0.5 }}
    >
      <View
        // Button Linear Gradient

        style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={require("../../images/logo.png")}
          style={{ height: 250, width: 250 }}
        />
      </View>

      <View style={{ flex: 3, backgroundColor: "white",borderTopLeftRadius:25,borderTopRightRadius:25 }}>
        <Text style={styles.title}>Login</Text>

        <View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor="#00000080"
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="#00000080"
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
            />
          </View>
        
              <TouchableOpacity
              style={{alignSelf:'flex-end',marginRight:'20%',marginBottom:10}}
                onPress={() => navigation.replace("ForgotPassword")}
              >
                <Text style={{fontSize:13}}>Forgot password?</Text>
              </TouchableOpacity>
            
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.Signupbutton}
              onPress={handleSubmitPress}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize:15,
                  fontWeight: "500",
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
            
            <View style={styles.textCenter}>
              
                <Text style={{ fontSize: 13, opacity: 0.7 }}>Don't have an account? <Text  onPress={() => navigation.navigate("IntroSliderScreen")} style={{fontSize:15,color:'blue',opacity:0.85}}>Sign Up</Text></Text>
             
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
   
  },

  form: {
    alignItems: "center",
    padding: 20,
  },
  input: {
    alignItems: "center",
    width: 300,
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#4A0D66",
    color: "black",
    margin: 10,
    padding: 8,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "500",
    shadowColor: "#4A0D66",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginBottom: 18,
    fontSize: 30,
    padding:25,
    color: "#5f0a87",
  },
  tilte2: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 18,
  },
  Signupbutton: {
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5f0a87",
    width: "50%",
    height: 45,
    textAlign: "center",
    borderRadius: 20,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrow: {
    marginLeft: 13,
    color: "white",
  },
  textCenter: {
    alignItems: "center",
    margin: 5,
  },
});

export default SignIn;

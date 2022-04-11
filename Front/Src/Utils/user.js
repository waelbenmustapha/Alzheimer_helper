import AsyncStorage from '@react-native-async-storage/async-storage';

  //User
  export const getUser = async (setuser) => {
    try {
      const jsonValue=JSON.parse(await AsyncStorage.getItem('user'))

      setuser(jsonValue);

    } catch(e) {
  console.log(e)  }
  }
  export const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
    //Token
    export const getToken = async () => {
        try {
            token=await AsyncStorage.getItem('token')
          if(token !== null) {
              return token
          }
        } catch(e) {
      console.log(e)  }
      }
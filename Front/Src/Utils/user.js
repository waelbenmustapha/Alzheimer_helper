import AsyncStorage from '@react-native-async-storage/async-storage';

  //User
  export const getUser = async (setuser) => {
    try {
      const jsonValue=JSON.parse(await AsyncStorage.getItem('user'))

      setuser(jsonValue);

    } catch(e) {
  console.log(e)  }
  }
  
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
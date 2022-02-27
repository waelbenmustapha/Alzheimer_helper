import { View, Text, TextInput ,TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import React, { useState } from 'react'

const signUp = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);
    if(mode=="date"){
      setMode("time");

    }
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
        <TextInput placeholder='Name'/>
        <TextInput placeholder='Email'/>

        <TextInput placeholder='PassWord' secureTextEntry={true}/>

        <TouchableOpacity onPress={showDatepicker}><Text>Birthday</Text></TouchableOpacity>

        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}        
        <TextInput/>
        <TextInput/>

    </View>
  )
}

export default signUp
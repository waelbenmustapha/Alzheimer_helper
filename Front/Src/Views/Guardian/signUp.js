import { View, Text, TextInput } from 'react-native'
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
        <TouchableOpacity onPress={showDatepicker}><Text>aaaaa</Text></TouchableOpacity>

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
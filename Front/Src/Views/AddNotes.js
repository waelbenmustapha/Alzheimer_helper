import { View, Text,StyleSheet,TextInput,TouchableOpacity,Image,Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import heure from '../../assets/heure.png'

const AddNotes = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    if(mode=="date"){
      setMode("time");
      setShow(true);

    }
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    
    <View style={styles.container}>
      <Text>Current date:{JSON.stringify(date)}</Text>
      <Text style={[styles.setFontSize,styles.setColorGreen]}>Add Note</Text>
      <TextInput style={styles.input} placeholder="Name note" />
      <TextInput style={styles.inputDesc} placeholder="Description" />
      <View>
      <View>
        <TouchableOpacity onPress={showDatepicker}><Image style={styles.DateTimePicker}source ={heure}/></TouchableOpacity>
      </View>
     
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
    </View>
      <TouchableOpacity style={styles.btnVal}><Text style={styles.txtVal}>Save</Text></TouchableOpacity>     
    </View>

  );
};

  
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 37,
        top:84,
      
      
    },
    setFontSize: {
        fontSize:20,
    },
    setColorGreen:{
        color:'#359A8E',

    },
    input:{
        width:300,
        borderWidth:0.5,
        borderRadius:20,
        padding:10,
        marginTop:20,
        backgroundColor:'#F1F2F2'   

        
        

    },
    inputDesc:{
        width:300,
        borderRadius:20,
        borderWidth:1,
        padding:100,
        marginTop:10,
        backgroundColor:'#F1F2F2'
    },
   
      btnVal: {
        position: 'absolute',
        right:0,
        top:450,
        width:100,
        padding:10,
        borderRadius:20

      },
      txtVal:{
        color:'#359A8E',
        textAlign:'center',
        fontSize:20,
        borderWidth:0.5,
        borderRadius:20,
        padding:5
       

      },
      DateTimePicker:{
        width:50,
        height:50,
        resizeMode: 'contain',
        alignSelf: 'center',
        

      }
    
  });

export default AddNotes

import { View, Text } from 'react-native'
import React from 'react'

const NoteElement = (props) => {
  return (
    <View key={props.element.id}><Text>el titre = {props.element.title}</Text><Text>wl text = {props.element.text}</Text></View>
  )
}

export default NoteElement
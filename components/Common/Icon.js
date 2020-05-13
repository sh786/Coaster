import React from 'react';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

export default function Icon(props) {
  if (props.antIcon) {
    return (
      <AntDesign
        onPress={props.onPress}
        name={props.name}
        size={props.size}
        style={props.style}
        color={props.color}
      />
    );
  }
  if (props.faIcon) {
    return (
      <FontAwesome
        onPress={props.onPress}
        name={props.name}
        size={props.size}
        style={props.style}
        color={props.color}
      />
    );
  }
  return (
    <Ionicons
      onPress={props.onPress}
      name={props.name}
      size={props.size}
      style={props.style}
      color={props.color}
    />
  );
}

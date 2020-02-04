import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Icon(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.size}
      style={props.style}
      color={props.color}
    />
  );
}

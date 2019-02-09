import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default ({ error }) => (
  <View>
    <Text>{ error.message }</Text>
  </View>
);

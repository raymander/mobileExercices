import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import List from './components/List.js';
import Map from './components/Map.js';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';

const MyApp = StackNavigator({
      List: {screen: List},
      Map: {screen: Map}
});

export default class App extends React.Component {

  render() {

    return <MyApp />;
}
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

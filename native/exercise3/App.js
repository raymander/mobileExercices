import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import History from './History';
import Calculator from './Calculator';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';

export default class App extends React.Component {

constructor(props) {
  super(props);
 	this.state = {field1: '', field2: '', final: '', data:[]}
}

	minusPressed = () => {
	let final = parseInt(this.state.field1) - parseInt(this.state.field2)
	let text=this.state.field1+"-"+this.state.field2+"="+final

	this.setState(
		{final: final,
		 data: [...this.state.data,
   {key: text}]
		})

	}

	plusPressed = () => {
	let final = parseInt(this.state.field1) + parseInt(this.state.field2)
	let text=this.state.field1+"+"+this.state.field2+"="+final
	this.setState(
		{final: final,
		 data: [...this.state.data,
   {key: text}]
		})
		}

  render() {

    return <MyApp/>;
}
}

const MyApp = StackNavigator({
      Calculator: {screen: Calculator},
      History: {screen: History}
});

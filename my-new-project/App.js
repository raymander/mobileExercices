import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default class App extends React.Component {

constructor(props) {
  super(props);
 this.state = {field1: '', field2: '', final: ''}
}
	
	minusPressed = () => {
	let final = parseInt(this.state.field1) - parseInt(this.state.field2)
this.setState(
	{final: final}
	)
	}
	
	plusPressed = () => {
	let final = parseInt(this.state.field1) + parseInt(this.state.field2)
this.setState(
	{final: final}
	)
	}
	
  render() {
	  	  				
    return (
		
 <View style={styles.container}> 
		
<TextInput style={{width: 200, borderColor: 'gray',
borderWidth: 1}}
  onChangeText={(field1) => this.setState({field1})}
  value={this.state.field1} keyboardType="numeric"
/>

<TextInput style={{width: 200, borderColor: 'gray',
borderWidth: 1}}
  onChangeText={(field2) => this.setState({field2})}
  value={this.state.field2} keyboardType="numeric"
/>

<Button onPress={this.minusPressed} title="-" />
<Button onPress={this.plusPressed} title="+" />
 
<Text>Result: {this.state.final}</Text>

</View>

)}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

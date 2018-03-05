import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {App} from './App';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';

export default class Calculator extends React.Component {
  static navigationOptions = {title: 'Calculator',};

  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

     	<TextInput style={{width: 200, borderColor: 'gray',
     	borderWidth: 1}}
     	  onChangeText={(field1) => App.setState({field1})}
     	  value={this.props.field1} keyboardType="numeric"
     	/>
     		  <Text>Result: {this.props.final}</Text>

     	<TextInput style={{width: 200, borderColor: 'gray',
     	borderWidth: 1}}
     	  onChangeText={(field2) => App.setState({field2})}
     	  value={this.props.field2} keyboardType="numeric"
     	/>
<App>
     <Button onPress={App.minusPressed()} title="-" />
     <Button onPress={App.plusPressed()} title="+" />
</App>
     <Button onPress={() => navigate('History')} title="History"/>

     </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

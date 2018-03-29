import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar, Image, Picker } from 'react-native';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currencies: [], amount: '', pick: ''};
  }

  componentDidMount = () => {
    const url = 'https://api.fixer.io/latest';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
let rates = responseJson.rates;
        this.setState({currencies: rates});
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }


  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <TextInput style={{fontSize: 18, width: 200}} placeholder='amount' onChangeText={(amount) => this.setState({amount})} />

        <Picker
          style={{width:100}}
          selectedValue={this.state.pick}
          onValueChange={(cur) => this.setState({pick: cur})}>

            {this.state.currencies.map((i) => {
              return <Picker.Item label={i} value={i} key={i} />
            })}


        </Picker>

<Text>{this.state.pick}</Text>


        <Button title="Convert"  />
      </View>
    );
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

import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar, Image, Picker } from 'react-native';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currencies: [], amount: 0, pick: '', pickIndex: 0, total: 0};
  }

  componentDidMount = () => {
    const url = 'https://api.fixer.io/latest';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          currencies: responseJson.rates
        });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

    renderPickItems = () => {
      let storeData = [];
      for (var currencyType in this.state.currencies) {
          var pickerItem = (
          <Picker.Item
          label={currencyType}
          value={currencyType}
          key={currencyType}
          />
          );
          storeData.push(pickerItem);
          }
      return storeData;
    };

    convert = () => {
      let amount = this.state.amount
      let pick  = this.state.pick
      let cur = this.state.currencies
      let pickedRate = cur[pick]
      let total = (amount/pickedRate).toFixed(2)
      this.setState({
        total
      })
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

        <TextInput style={{fontSize: 18, width: 200}} placeholder='amount' keyboardType='numeric' onChangeText={(amount) => {this.setState({amount: parseInt(amount)});
      }}
      />

        <Text>{this.state.total} €</Text>

        <Picker
          style={{width:100}}
          selectedValue={this.state.pick}
          onValueChange={(itemValue,itemIndex) => {
            this.setState({pick: itemValue,
          pickIndex:itemIndex
          });
        }}
      >

        {this.renderPickItems()}


        </Picker>


        <Button title="Convert" onPress={this.convert} />
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

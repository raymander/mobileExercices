import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native';
import Expo, {SQLite} from 'expo';
import { FormLabel, FormInput, Button, List, ListItem, Header} from 'react-native-elements';

const db = SQLite.openDatabase('shoppingdb.db');

export default class App extends React.Component {

constructor(props) {
  super(props);
 this.state = {product: '', amount: '', shopping: []}
}

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, amount text, product text);');
    });
    this.updateList();
}

 addItem = () => {
   db.transaction(tx => {
           tx.executeSql('insert into shopping (amount, product) values (?, ?)', [this.state.amount, this.state.product]);
   }, null, this.updateList)
}

updateList = () => {
   db.transaction(tx => {
     tx.executeSql('select * from shopping', [], (_, { rows }) =>
       this.setState({shopping: rows._array})
     );
   });
}

deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from shopping where id = ?;', [id]);
      }, null, this.updateList
    )
}


  render() {
    return (

      <View style={styles.container}>
  <StatusBar hidden={true}/>

  <Header
  centerComponent={{text:'SHOPPING LIST', style:{color:'#fff', width:"100%"} }}
  />

  <View style={styles.container}>
      <FormLabel>Product</FormLabel>
      <FormInput placeholder='Product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(product) => this.setState({product})}
      value={this.state.product}
      />
      <FormLabel>Amount</FormLabel>
      <FormInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5, fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(amount) => this.setState({amount})}
      value={this.state.amount}
  />
 </View>

 <KeyboardAvoidingView behavior="padding" style={{width: '100%'}}>
 <Button onPress={this.addItem} title="SAVE" />

      <List>
          {this.state.shopping.map((item) => (
            <ListItem
                key={item.id}
                title={item.product}
                subtitle={item.amount}
                rightTitle={"Bought"}
                onPress={() => this.deleteItem(item.id)}      
            />
          ))
          }
      </List>

 </KeyboardAvoidingView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    color: 'white'
  },
  buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});

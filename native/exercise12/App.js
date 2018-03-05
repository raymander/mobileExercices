import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import {SQLite} from 'expo';

const db = SQLite.openDatabase('shopping.db');

export default class App extends React.Component {

constructor(props) {
  super(props);
 this.state = {text: '', data: []}
}


  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, item text);');
    });
    this.updateList();
}

 add = () => {
   db.transaction(tx => {
           tx.executeSql('insert into shopping (item) values (?)', [this.state.text]);
   }, null, this.updateList)
}

updateList = () => {
   db.transaction(tx => {
     tx.executeSql('select * from shopping', [], (_, { rows }) =>
       this.setState({data: rows._array})
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

  <TextInput style={{marginTop : "20%", width : 200, borderColor: 'gray', borderWidth: 1}}
  onChangeText={(text) => this.setState({text})}
  value={this.state.text}
/>

<Button onPress={this.add} title="Add" />

	<Text>Shopping list</Text>




     <FlatList
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
          <View style={styles.listcontainer}>
          <Text style={{fontSize: 18}}> {item.item} </Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() =>
            this.deleteItem(item.id)}>done</Text></View>}
            data={this.state.data}
      />

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
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});

import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native';
import Expo, {SQLite} from 'expo';
import {StackNavigator} from 'react-navigation';
import { FormLabel, FormInput, Button, List, ListItem, Header} from 'react-native-elements';

const db = SQLite.openDatabase('shoppingdb.db');

export default class App extends React.Component {
  static navigationOptions = {title: 'My places'};

constructor(props) {
  super(props);
  this.state = {address: '', places: []}
}

componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists places (id integer primary key not null, address text);');
    });
    this.updateList();
}

 addItem = () => {
   db.transaction(tx => {
           tx.executeSql('insert into places (address) values (?)', [this.state.address]);
   }, null, this.updateList)
}

updateList = () => {
   db.transaction(tx => {
     tx.executeSql('select * from places', [], (_, { rows }) =>
       this.setState({places: rows._array})
     );
   });
}

deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from places where id = ?;', [id]);
      }, null, this.updateList
    )
}


  render() {
    const { navigate } = this.props.navigation;

    return (

  <View style={styles.container}>
      <StatusBar hidden={true}/>

      <View style={styles.container}>
          <FormLabel>PLACEFINDER</FormLabel>
          <FormInput placeholder='Type an address' style={{fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(address) => this.setState({address})}
          value={this.state.address}
          />
     </View>

     <KeyboardAvoidingView behavior="padding" style={{width: '100%'}}>
         <Button raised icon={{name: 'save'}} onPress={this.addItem} title="SAVE" />

              <List>
                  {this.state.places.map((item) => (
                    <ListItem
                        key={item.id}
                        title={item.address}
                        rightTitle={"show on map"}
                        onPress={() => navigate('Map', {address: item.address})}
                        onLongPress={() => this.deleteItem(item.id)}
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
  }
});

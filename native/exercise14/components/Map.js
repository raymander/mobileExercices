import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import { MapView } from 'expo';

export default class History extends React.Component {
  static navigationOptions = {title: 'Map'};


constructor(props) {
  super(props);
  this.state = {
    region:
    {
      latitude: 0.0,
      longitude: 0.0,
      latitudeDelta: 0.0,
      longitudeDelta: 0.0
    }
  }
}

componentDidMount() {
  const { params } = this.props.navigation.state;
  const address = params.address;

  this.search(address);
}

search = (address) => {
  const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  address + "&key=AIzaSyClulqjPepQjs9IWY8qfUlcUIHeFyr_2Ys"
  fetch(url)
  .then((response) => response.json())
  .then((responseData) => {
    let lat = responseData.results[0].geometry.location.lat;
    let lng = responseData.results[0].geometry.location.lng;
    let latD = responseData.results[0].geometry.viewport.northeast.lat - responseData.results[0].geometry.viewport.southwest.lat;
    let lngD = responseData.results[0].geometry.viewport.northeast.lng - responseData.results[0].geometry.viewport.southwest.lng;
    this.setState({region:{latitude:lat, longitude:lng, latitudeDelta: latD, longitudeDelta: lngD}})
  })
}

  render() {

    return (
        <View style={styles.container}>
        <MapView
           style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
           region={{
           latitude: this.state.region.latitude,
           longitude: this.state.region.longitude,
           latitudeDelta: this.state.region.latitudeDelta,
           longitudeDelta: this.state.region.longitudeDelta
         }}
         >

           <MapView.Marker
             coordinate={{
             latitude: this.state.region.latitude,
             longitude: this.state.region.longitude}}
             />

         </MapView>

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

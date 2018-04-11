import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Location, Permissions, MapView } from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      region: {
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      }
    }
  }

    componentDidMount() {
      this.getLocation();
    }

    getLocation = async () => {
    //Check permission
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          Alert.alert('No permission to access location');
        }
        else {
          let location = await Location.getCurrentPositionAsync({enableHighAccuracy:false});
          this.setState({region:{latitude:location.coords.latitude, longitude:location.coords.longitude}})
      }
    };


  search = () => {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    this.state.address + "&key=AIzaSyClulqjPepQjs9IWY8qfUlcUIHeFyr_2Ys"
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      let lat = responseData.results[0].geometry.location.lat;
      let lon = responseData.results[0].geometry.location.lng;
      this.setState({region:{latitude:lat, longitude:lon}})
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
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221
              }}
              >

                <MapView.Marker
                  coordinate={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude}}
                  />

              </MapView>

        <View style={styles.search}>

        <TextInput style={{
          height:40,
          backgroundColor:'white',
          bottom:38,
        }}
        onChangeText={(address) => this.setState({address})}
	  		value={this.state.address}
        placeholder= 'Where to?' />

        <Button onPress={this.search} title="SHOW" />

        </View>
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
  search: {
    position: 'absolute',
    bottom:5,
    width: 300,
  },
});

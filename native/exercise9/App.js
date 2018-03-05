import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Location, Permissions, MapView } from 'expo';

export default class App extends React.Component {

  constructor(props) {
      super(props);
    this.state = {address: '', location: null, region: {latitude: '', longitude: '', latitudeDelta: 0.0322,
    longitudeDelta: 0.0221}}
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
		this.setState({ location });
		Alert.alert('lalalala');
}
};

  search = () => {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    this.state.address + "&key=AIzaSyClulqjPepQjs9IWY8qfUlcUIHeFyr_2Ys"
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      const lat = responseData.results[0].geometry.location.lat;
      const lon = responseData.results[0].geometry.location.lon;
      this.setState({region:{latitude:lat, longitude:lon}})
    })
  }

  onRegionChange = (region) => {


  }

  render() {
    return (
      <View style={styles.container}>


             <MapView
                style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
                initialRegion={{
                latitude: 60.200692,
                longitude: 24.934302,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
              }} >

                <MapView.Marker
                  coordinate={{
                  latitude: this.state.location.coords.latitude,
                  longitude: this.state.location.coords.longitude}}
                  title='Haaga-Helia' />

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
        </View>
        <View style={styles.search}>
        <Button onPress={this.search} title="SHOW" />
		<Text>{JSON.stringify(this.state.location)}</Text>
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

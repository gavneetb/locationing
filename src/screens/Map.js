import * as React from "react";
import MapView, { Callout, Marker, Circle } from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

let apiKey = "YOAIzaSyBwtBDv97-uqDJfyj_AtHrZqIlYFlG-fAk";

//need to obtain users current lat and long
//from there we will take that lat and long and add the current marker

//

const Map = () => {
  const [pin, setPin] = React.useState({
    latitude: 43.47246,
    longitude: -80.54484,
  });

  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [getLocation, setGetLocation] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      //setting apiKey
      Location.setGoogleApiKey(apiKey);

      //location.coords translates as coords
      //   let location = await Location.getCurrentPositionAsync({});
      //   console.log(location);
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      console.log(location);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
        console.log(regionName, "nothing");
      }

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, [getLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.47246,
          longitude: -80.54484,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          //   console.log("onUserLocationChange", e.nativeEvent.coordinate);

          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker
          coordinate={pin}
          title="Test Title"
          description="Test Description"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent);

            // setPin({
            //   latitude: e.nativeEvent.coordinate.latitude,
            //   longitude: e.nativeEvent.coordinate.longitude,
            // });
          }}
        >
          <Callout>
            <Text>this is a callout</Text>
          </Callout>
        </Marker>
        {/* <Circle center={{ pin }} radius={100} /> */}
      </MapView>

      {/* <TouchableOpacity onPress={() => setGetLocation(!getLocation)}>
        <View
          style={{
            height: 100,
            backgroundColor: "teal",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={styles.btnText}> GET LOCATION </Text>
        </View>
      </TouchableOpacity> */}
      <Text style={styles.big}>
        {!location
          ? "Waiting"
          : ` ${address?.name} \n ${address?.streetNumber} ${address?.street} \n ${address?.city}, ${address?.region} \n ${address?.postalCode}, ${address?.country} `}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "75%",
  },
  big: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
});

export default Map;

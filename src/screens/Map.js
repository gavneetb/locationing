import * as React from "react";
import MapView, { Callout, Marker, Circle } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

//need to obtain users current lat and long
//from there we will take that lat and long and add the current marker

const Map = () => {
  const [pin, setPin] = React.useState({
    latitude: 43.47246,
    longitude: -80.54484,
  });

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

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
          console.log("onUserLocationChange", e.nativeEvent.coordinate);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;

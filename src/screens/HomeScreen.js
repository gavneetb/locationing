import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>home screen</Text>

      <Button
        onPress={() => navigation.navigate("Map")}
        //giving a title to the button
        title="Login"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

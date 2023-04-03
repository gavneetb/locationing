import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      {/*text on home screen  */}
      <Text>home screen</Text>

      {/*button to navigate from homescreen to any other page  */}

      <Button
        //action on the button
        onPress={() => navigation.navigate("Login")}
        //giving a title to the button
        title="Login"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

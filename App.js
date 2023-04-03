import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import Map from "./src/screens/Map";
import "react-native-gesture-handler";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: Login,
    Map: Map,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);

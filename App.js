import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import "react-native-gesture-handler";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: Login,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);

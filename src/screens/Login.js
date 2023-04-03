import React, { Component } from 'react';
import { View, TextInput, Button, Text} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <View>
        <Text> Login Page </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={() => alert('Login Button Clicked')} />
      </View>
    );
  }
}

export default Login;

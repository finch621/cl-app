import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import ErrorMsg from './ErrorMsg';

export default class SignUpForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handlePress = () => {
    this.props.signUp({
      variables: {email: this.state.email, password: this.state.password},
    });
  };

  _navigateToLogin = (screen) => {
    // this.props.navigation.navigate(screen);
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.center}>
        {this.props.error ? <ErrorMsg error={this.props.error} /> : null}
        <Input
          onChangeText={input => this.setState({email: input})}
          placeholder="Email"
        />
        <Input
          secureTextEntry={true}
          onChangeText={input => this.setState({password: input})}
          placeholder="Password"
        />
        <View style={styles.centerButtons}>
          <Button
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyleSignup}
            title="Signup"
            onPress={this.handlePress}
          />
          <Button
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyleLogin}
            title="Login here"
            onPress={this._navigateToLogin}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtons: {
    flexDirection: 'row',
  },
  buttonContainerStyle: {
    paddingTop: 10,
    paddingLeft: 5,
  },
  buttonStyleLogin: {
    backgroundColor: '#feb715',
  },
  buttonStyleSignup: {
    backgroundColor: '#49afc3',
  },
});

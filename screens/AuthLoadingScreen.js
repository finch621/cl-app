import React from 'react';
import {
  AsyncStorage,
} from 'react-native';
import Loading from '../components/Loading';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  static navigationOptions = {
    header: null,
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(accessToken ? 'Main' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Loading />
    );
  }
}

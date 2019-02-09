import React, {Component} from 'react';
import {Mutation, ApolloConsumer} from 'react-apollo';
import {AsyncStorage} from 'react-native';
import gql from 'graphql-tag';

import LoginForm from '../components/LoginForm';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  async _setStorageItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('_setStorageItem err', e);
    }
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={LOGIN}
            onCompleted={({ login: { accessToken } }) => {
              this._setStorageItem('accessToken', accessToken);
              this.props.navigation.navigate('Main');
            }}>
            {(login, {loading, error}) => {
              if (loading) return <Loading />;

              return (
                <LoginForm
                  navigation={this.props.navigation}
                  error={error}
                  login={login}
                />
              );
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

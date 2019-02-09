import React, {Component} from 'react';
import {Mutation, ApolloConsumer} from 'react-apollo';
import {AsyncStorage} from 'react-native';
import gql from 'graphql-tag';

import SignupForm from '../components/SignupForm';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';

export const SIGN_UP = gql`
  mutation sign_up($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default class SignupScreen extends Component {
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
            mutation={SIGN_UP}
            onCompleted={({ signUp: { accessToken }}) => {
              this._setStorageItem('accessToken', accessToken);
              this.props.navigation.navigate('Main');
            }}>
            {(signUp, {loading, error}) => {
              if (loading) return <Loading />;

              return (
                <SignupForm
                  navigation={this.props.navigation}
                  error={error}
                  signUp={signUp}
                />
              );
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

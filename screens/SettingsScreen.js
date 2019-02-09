import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  _handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      this.props.navigation.navigate('Login');
    } catch (e) {
      console.log('_handleLogout err', e);
    }
  }

  onPress = (setting) => {
    if (setting === 'Logout') {
      this._handleLogout();
    }
  }

  render() {
    const settingsList = ['Logout'];
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        {settingsList.map((setting, i) => (
          <ListItem
            key={i}
            containerStyle={styles.listItemContainerStyle}
            title={setting}
            onPress={this._handleLogout.bind(this, setting)}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainerStyle: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
});

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import ErrorMsg from './ErrorMsg';

export default class SignUpForm extends Component {
  state = {
    task: '',
  };

  handlePress = () => {
    this.props.addTask({
      variables: { task: this.state.task, user_id: 1 },
    });
  };

  render() {
    return (
      <View style={styles.center}>
        {this.props.error ? <ErrorMsg error={this.props.error} /> : null}
        <Input
          onChangeText={input => this.setState({task: input})}
          placeholder="Task"
        />
        <Button
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
          title="Add task"
          onPress={this.handlePress}
        />
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
  buttonContainerStyle: {
    paddingTop: 10,
  },
  buttonStyle: {
    backgroundColor: '#23aaaa',
  },
});

import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

import {Button} from 'react-native-elements';
import {FontAwesome} from '@expo/vector-icons';

import Loading from '../components/Loading';
import TaskForm from '../components/TaskForm';

const ADD_TASK = gql`
  mutation add_task($task: String!) {
    addTask(task: $task) {
      id
      task
      updatedAt
      user_id
    }
  }
`;

export default class TaskScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#23aaaa',
    },
    headerLeft: (
      <Button
        buttonStyle={{backgroundColor: '#23aaaa'}}
        icon={<FontAwesome name="chevron-left" size={32} color={'#fff'} />}
        onPress={() => navigation.navigate('Home')}
      />
    ),
  })

  render() {
    return (
      <Mutation mutation={ADD_TASK} onCompleted={() => this.props.navigation.navigate('Home')}>
        {(addTask, {error, loading}) => {
          if (loading) return <Loading />;

          return <TaskForm error={error} addTask={addTask} />;
          }}
        </Mutation>
    );
  }
}

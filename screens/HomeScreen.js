import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {FontAwesome} from '@expo/vector-icons';
import {Query, ApolloConsumer} from 'react-apollo';
import gql from 'graphql-tag';
import Swipeout from 'react-native-swipeout';

import ta from 'time-ago';

import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';

const GET_TASKS = gql`
  query get_tasks($skip: Int, $limit: Int!) {
    tasks(skip: $skip, limit: $limit) {
      count
      tasks {
        id
        task
        user_id
        updatedAt
        deleted
      }
    }
  }
`;

const REMOVE_TASK = gql`
  mutation remove_task($id: ID!) {
    removeTask(id: $id) {
      id
    }
  }
`;

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitleStyle: {
      color: '#fff',
    },
    headerStyle: {
      backgroundColor: '#23aaaa',
      color: '#fff',
    },
    headerTitle: 'Tasks',
    headerRight: (
      <Button
        buttonStyle={{backgroundColor: '#23aaaa'}}
        icon={<FontAwesome name="plus" size={32} color="#fff" />}
        onPress={() => navigation.navigate('Task')}
      />
    ),
  });

  // state = {
  //   hasScrolled: false,
  //   currentSkip: 0,
  //   limit: 10,
  // }

  // _handleScroll = () => {
  //   this.setState({ hasScrolled: true });
  // }
  //
  // _handleLoadMore = (fetchMore, totalTasksCount) => {
  //   if (!this.state.hasScrolled) return null;
  //
  //   const newSkip = this.state.currentSkip + this.state.limit;
  //
  //   if (totalTasksCount === newSkip) return null;
  //
  //   fetchMore({
  //     variables: {
  //       skip: newSkip,
  //       limit: this.state.limit,
  //     },
  //     updateQuery: (prev, { fetchMoreResult, ...rest }) => {
  //       if (!fetchMoreResult) return prev;
  //
  //       const newTasks = [
  //         ...prev.tasks.tasks,
  //         ...fetchMoreResult.tasks.tasks,
  //       ];
  //
  //       const newResult = {
  //         ...fetchMoreResult,
  //         tasks: {
  //           ...fetchMoreResult.tasks,
  //           tasks: newTasks,
  //         },
  //       };
  //
  //       return newResult;
  //     },
  //   });
  //
  //   this.setState({ currentSkip: newSkip, hasScrolled: false })
  // }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={GET_TASKS} variables={{skip: 0, limit: 20}} pollInterval={500}>
            {({data, loading, error, fetchMore}) => {
              if (loading) return <Loading />;
              if (error) return <ErrorMsg error={error} />;

              if (data.tasks && data.tasks.tasks) {
                return (
                  <View>
                    <FlatList
                      keyExtractor={item => item.id}
                      data={data.tasks.tasks}
                      // onScroll={this._handleScroll}
                      // onEndReachedThreshold={0.1}
                      // onEndReached={this._handleLoadMore.bind(this, fetchMore, data.tasks.count)}
                      renderItem={({item}) => {
                        const swipeSettings = {
                          autoClose: true,
                          onClose: (secId, rowId, direction) => {},
                          onOpen: (secId, rowId, direction) => {},
                          right: [
                            {
                              onPress: () => {
                                client.mutate({
                                  mutation: REMOVE_TASK,
                                  variables: { id: item.id },
                                });
                              },
                              text: 'Delete',
                              type: 'delete',
                            },
                          ],
                        };

                        return (
                          <Swipeout {...swipeSettings}>
                            <ListItem
                              title={item.task}
                              subtitle={ta.ago(new Date(item.updatedAt))}
                              containerStyle={styles.listItemContainerStyle}
                            />
                          </Swipeout>
                        );
                      }}
                    />
                  </View>
                );
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainerStyle: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
});

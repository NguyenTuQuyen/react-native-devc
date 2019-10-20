import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { TODOS } from './utils/data';

const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };
  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => props.onToggleTodo(props.todo.id)}
      onLongPress={() => onLongPress(props.todo)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};

class AllScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: TODOS,
      todoBody: ""
    }
  }
  onToggleTodo = id => {
    const todo = this.state.todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = this.state.todoList.findIndex(todo => todo.id === id);
    this.state.todoList[foundIndex] = todo;
    const newTodoList = [...this.state.todoList];
    this.setState({
      todoList: newTodoList
    })
    setTimeout(() => {
      this.props.navigation.navigate('Detail', {
        updatedTodo: todo
      });
    }, 1000);
  };
  onDeleteTodo = id => {
    alert("delete")
    this.setState({
      todoList: this.state.todoList.filter(todo => todo.id !== id)
    })
  };
  setBody = (text) => {
    this.setState({
      todoBody: text
    })
  }
  onSubmitTodo = () => {
    const newTodo = {
      body: this.state.todoBody,
      status: 'Active',
      id: this.state.todoList.length + 1
    };
    const newTodoList = [...this.state.todoList, newTodo];
    this.setState({
      todoList: newTodoList,
      todoBody: ""
    })
  };
  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
      >
        <ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {TODOS.map((todo, idx) => {
              return <TodoItem key={todo.body} todo={todo} idx={idx} onToggleTodo={this.onToggleTodo} onDeleteTodo={this.onDeleteTodo} />;
            })}
            <View style={styles.inputContainer}>
              <TextInput
                value={this.state.todoBody}
                style={styles.todoInput}
                onChangeText={this.setBody}
              />
              <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
AllScreen.navigationOptions = {
  header: null,
  title: 'All Todos'
};
class ActiveScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      </View>
    );
  }
}
ActiveScreen.navigationOptions = {
  header: null,
  title: 'Active todos'
};
class CompleteScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}
CompleteScreen.navigationOptions = {
  header: null,
  title: 'Completed todos'
};
class DetailScreen extends React.Component {
  render() {
    const { id, status, body } = this.props.navigation.state.params.updatedTodo;
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {id}. {status}
        </Text>
        <Text style={styles.bodyText}>{body}</Text>
      </View>
    );
  }
}
DetailScreen.navigationOptions = {
  title: 'Detail todos'
};
const AllStack = createStackNavigator({
  All: { screen: AllScreen },
  Detail: { screen: DetailScreen },
});

const ActiveStack = createStackNavigator({
  Active: { screen: ActiveScreen }
});
const CompleteStack = createStackNavigator({
  Complete: { screen: CompleteScreen }
});

export default createAppContainer(createBottomTabNavigator(
  {
    Complete: { screen: CompleteStack },
    All: { screen: AllStack },
    Active: { screen: ActiveStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'All') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Active') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Complete') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  headerContainer: {
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 30
  },
  bodyText: {
    fontSize: 50
  },
  scrollView: {
    flex: 1,
    paddingTop: 1000
  }
}); 
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  Button, Card, ListItem,
  FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../util/notifications'

export default class Result extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Result',
      headerStyle: {
        backgroundColor: '#564256',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitle: null,
      headerTintColor: 'white',
    };
  };

  componentDidMount(){
    clearLocalNotification().then(setLocalNotification);
  }

  restartQuiz = () => {
    const { title } = this.props.navigation.state.params;
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'SingleDeck', params: { title } }),
        NavigationActions.navigate({ routeName: 'QuizManager', params: { title } })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }


  returnToDeck = () => {
    const { title } = this.props.navigation.state.params;
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'SingleDeck', params: { title } })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { result, title } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          {
            result !== 0
              ? <Text>
                Your result is {parseFloat(result * 100).toFixed(2)}% 💪
                </Text>
              : <Text>
                Nothing answered correctly, you need to study more. 😅
                </Text>
          }
        </View>
        <View style={styles.buttons}>
          <Button
            title="Restart Quiz"
            onPress={this.restartQuiz}
            containerViewStyle={styles.restart}
            backgroundColor='#96939B'
          />
          <Button
            title="Back to Deck"
            onPress={this.returnToDeck}
            backgroundColor='#BFBFBF'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  result: {
    marginTop: 35,
    marginBottom: 35,
    alignSelf: "center",
  },
  buttons: {
    flex: 1
  },
  restart: {
    marginBottom: 10
  }
});
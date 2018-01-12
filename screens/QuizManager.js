import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { Button, Card, ListItem } from 'react-native-elements';
import _ from 'lodash';
import Question from './Question'
import { NavigationActions } from 'react-navigation'

class QuizManager extends Component {
  state = {
    currentQuestion: 1,
    correctAnswers: 0,
  }
  
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `${title} Deck Quiz`,
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

  correctPressed = () => {
    const { title } = this.props.navigation.state.params
    const { currentQuestion, correctAnswers } = this.state;
    const { length } = this.props.questions;
    if (currentQuestion === length){
      const result = (correctAnswers + 1) / length;
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'SingleDeck', params: {title}}),
          NavigationActions.navigate({ routeName: 'Result', params: {result, title}})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    } else {
      this.setState((prevState, { questions }) => {
        return {
          correctAnswers: prevState.correctAnswers+=1,
          currentQuestion: prevState.currentQuestion+=1,
          viewAnswer: false
        }
      })
    }
  }

  incorrectPressed = () => {
    const { title } = this.props.navigation.state.params
    const { currentQuestion, correctAnswers } = this.state;
    const { length } = this.props.questions;
    if (currentQuestion === length){
      const result = correctAnswers / length;
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'SingleDeck', params: {title}}),
          NavigationActions.navigate({ routeName: 'Result', params: {result, title}})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    } else {
      this.setState((prevState, {questions}) => {
        return {
          currentQuestion: prevState.currentQuestion+=1,
          viewAnswer: false
        }
      })
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>{currentQuestion} from {questions.length}</Text>
        <View style={styles.containerCard}> 
          <Question 
            question={questions[currentQuestion-1]} 
            viewAnswer={false} />
        </View>
        <View style={styles.buttons}>
          <Button 
            title="Correct" 
            backgroundColor='#94a881' 
            containerViewStyle={styles.correct}
            onPress={this.correctPressed}
            />
          <Button 
            title="Incorrect" 
            backgroundColor='#cc5959'
            onPress={this.incorrectPressed}
            />
        </View>
      </View>
    )
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const questions = decks[navigation.state.params.title].questions
  return {
    questions: decks[navigation.state.params.title].questions
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  counter: {
    marginTop: 15,
    alignSelf: "center",
  },
  containerCard: {
    flex:2
  },
  buttons: {
    flex:1
  },
  correct: {
    marginBottom: 20
  }
});

export default connect(mapStateToProps)(QuizManager)
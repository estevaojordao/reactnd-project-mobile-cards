import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  Button, Card, ListItem,
  FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';

class AddQuestion extends Component {
  state = {
    questions: '',
    answer: '',
    errorQuestion: false,
    errorAnswer: false,
    success: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Question',
      headerStyle: {
        backgroundColor: '#564256',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    };
  };

  componentDidMount(){
    this.InputQ.focus();
  }

  handleQuestionChange = (question) => {
    this.setState({ question, success: false, errorQuestion: question.length > 0 ? false : true });
  }

  handleAnswerChange = (answer) => {
    this.setState({ answer, success: false, errorAnswer: answer.length > 0 ? false : true });
  }

  handleOnPress = () => {
    const { question, answer, errorQuestion, errorAnswer, success } = this.state;
    const { addQuestion } = this.props;
    const title = this.props.navigation.state.params;

    if (question === '') {
      this.InputQ.shake();
      this.setState({ errorQuestion: true, success: false });
    }

    if (answer === '') {
      this.InputA.shake();
      this.setState({ errorAnswer: true, success: false });
    }

    if (question !== '' && answer !== '') {
      this.InputQ.clearText();
      this.InputA.clearText();
      addQuestion(title, question, answer);
      this.InputQ.focus();
      this.setState({ 
        question: '', 
        answer: '', 
        errorQuestion: false, 
        errorAnswer: false, 
        success: true 
      })
    }
  }

  render() {
    const { question, answer, errorQuestion, errorAnswer, success } = this.state;
    return (
      <View>
        <FormLabel>Add Question</FormLabel>
        <FormInput
          ref={(InputQ) => this.InputQ = InputQ}
          containerStyle={{ borderColor: "#FC814A", borderStyle: 'solid', margin: 10 }}
          onChangeText={this.handleQuestionChange}
          value={question}
        />
        {
          errorQuestion &&
          <FormValidationMessage labelStyle={{ color: 'red' }}>
            {'This field is required'}
          </FormValidationMessage>
        }

        <FormLabel>Add Answer</FormLabel>
        <FormInput
          ref={(InputA) => this.InputA = InputA}
          containerStyle={{ borderColor: "#FC814A", borderStyle: 'solid', margin: 10 }}
          onChangeText={this.handleAnswerChange}
          value={answer}
        />
        {
          errorAnswer &&
          <FormValidationMessage labelStyle={{ color: 'red' }}>
            {'This field is required'}
          </FormValidationMessage>
        }

        <Button
          onPress={this.handleOnPress}
          icon={{ name: 'ios-add-circle-outline', type: 'ionicon' }}
          backgroundColor='#96939B'
          title='Add Question'
        />

        {
          success &&
          <FormValidationMessage labelStyle={{ color: 'green' }}>
            {'Question added!'}
          </FormValidationMessage>
        }

      </View>
    );
  }
}


export default connect(null, { addQuestion })(AddQuestion)
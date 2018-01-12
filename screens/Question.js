import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Button, Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

export default class Question extends Component {
  state = {
    viewAnswer: this.props.viewAnswer
  }

  componentWillReceiveProps(nextProp){
    if (this.state.viewAnswer && !nextProp.viewAnswer){
      this.setState({viewAnswer: false})
    }
  }

  switchView = () => {
    this.setState((prevState) => {
      return {
        viewAnswer: !prevState.viewAnswer
      }
    })
  }

  render() {
    const { viewAnswer } = this.state;
    const { question, answer } = this.props.question;
    return (
      <Card containerStyle={styles.container}>
        <View>
        {
          viewAnswer
            ? <Text style={styles.content}>
              {answer}
              </Text>
            : <Text style={styles.content}>
              {question}
              </Text>
        }
        </View>
        <TouchableWithoutFeedback onPress={this.switchView} containerStyle={styles.switchView}>
          <View style={styles.switchView}>
            {
              viewAnswer
                ? <Text>view question</Text>
                : <Text>view answer</Text>
            }
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  content: {
    fontSize: 20,
    marginBottom: 50
  },
  switchView: {
    alignSelf: 'center'
  }
});
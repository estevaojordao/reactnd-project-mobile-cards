import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { Button, Card, ListItem } from 'react-native-elements';
import _ from 'lodash';

class SingleDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const DeckTitle = navigation.state.params.title
    return {
      title: `${DeckTitle} Deck`,
      headerRight: (
        <Button
          backgroundColor="#564256"
          color="#564256"
          icon={{ name: 'plus', type: 'font-awesome', size: 20 }}
          onPress={() => navigation.navigate('AddQuestion', DeckTitle)}
        />
      ),
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

  render() {
    const { navigation } = this.props
    const { title, questions } = this.props.deck;
    return (
      <View style={styles.singleDeck}>
        <Text style={styles.deckContent}>
          This deck has {questions.length} questions!
        </Text>
        {
          questions.length > 0
            ? <Button
              icon={{ name: 'ios-timer-outline', type: 'ionicon' }}
              backgroundColor='#96939B'
              title='Start Quiz!'
              onPress={() => navigation.navigate('QuizManager', { title })}
            />
            : <TouchableWithoutFeedback onPress={() => navigation.navigate('AddQuestion', title)}>
                <View>
                  <Text style={styles.addSome}>Add Card!</Text>
                </View>
              </TouchableWithoutFeedback>
        }
      </View>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  return {
    deck: decks[navigation.state.params.title]
  }
}

const styles = StyleSheet.create({
  singleDeck: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  deckContent: {
    fontSize: 24,
    marginTop: 50,
    marginBottom: 50,
    alignSelf: "center",
  },
  addSome: {
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "center",
    alignSelf: "center"
  }
});

export default connect(mapStateToProps)(SingleDeck)
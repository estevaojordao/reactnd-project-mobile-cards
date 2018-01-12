import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet, LayoutAnimation, ScrollView } from 'react-native';
import { Button, Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

class DecksHome extends Component {

  componentDidMount(){
    LayoutAnimation.spring();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Decks',
      headerRight: (
        <Button
          backgroundColor="#564256"
          color="#564256"
          icon={{ name: 'plus', type: 'font-awesome', size: 20 }}
          onPress={() => navigation.navigate('AddDeck')}
        />
      ),
      headerStyle: {
        backgroundColor: '#564256',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitle: null,
    };
  };

  onDeckPress = (title) => {
    LayoutAnimation.spring();
    this.props.navigation.navigate('SingleDeck', { title })
  }

  renderSingleDeck = (title, questions) => {
    return (
      <TouchableWithoutFeedback
        key={title}
        onPress={() => { this.onDeckPress(title) }}
      >
          <Card>
            <Text style={styles.deckTitle}>
              {title}
            </Text>
            <Text style={styles.deckContent}>
              This deck has {questions.length} questions for you!
            </Text>
          </Card>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { decks } = this.props;
    return (
      <ScrollView>
        {decks.length > 0
          ? decks.map(({ title, questions }) => this.renderSingleDeck(title, questions))
          : <View style={styles.addView}>
              <Text style={styles.addText}>Add some decks now!</Text>
            </View>
        }
      </ScrollView>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks: _.values(decks)
  }
}

const styles = StyleSheet.create({
  addView: {
    alignSelf: 'center',
    marginTop: 150,
  },
  addText: {
    fontSize: 25
  },
  deckTitle: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  deckContent: {
    alignSelf: 'center',
    marginBottom: 10
  }
});

export default connect(mapStateToProps)(DecksHome)
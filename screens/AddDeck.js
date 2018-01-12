import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  Button, Card, ListItem,
  FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
  state = {
    title: '',
    error: false
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Deck',
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
    this.Input.focus();
  }

  handleTitleChange = (title) => {
    this.setState({ title, error: title.length > 0 ? false : true });
  }

  handleOnPress = () => {
    const { title, error } = this.state;
    const { addDeck } = this.props;
    if (title === ''){
      this.Input.shake();
      return this.setState({ error: true });
    }
    this.Input.clearText();
    addDeck(title);
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'SingleDeck', params: {title}})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { title, error } = this.state;
    return (
      <View>
        <FormLabel>Deck Title</FormLabel>
        <FormInput
          ref={(Input) => this.Input = Input}
          containerStyle={{ borderColor: "#FC814A", borderStyle: 'solid', margin: 10 }}
          onChangeText={this.handleTitleChange}
          value={title}
        />
        {
          error &&
          <FormValidationMessage labelStyle={{ color: 'red' }}>
            {'This field is required'}
          </FormValidationMessage>
        }
        <Button
          onPress={this.handleOnPress}
          icon={{ name: 'ios-add-circle-outline', type: 'ionicon' }}
          backgroundColor='#96939B'
          title='Add Deck'
        />
      </View>
    );
  }
}

export default connect(null, { addDeck })(AddDeck)
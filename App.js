import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import Logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

import DecksHome from './screens/DecksHome';
import SingleDeck from './screens/SingleDeck';
import AddDeck from './screens/AddDeck';
import QuizManager from './screens/QuizManager'
import Question from './screens/Question';
import AddQuestion from './screens/AddQuestion';
import Result from './screens/Result';

import { setLocalNotification } from './util/notifications'

const store = createStore(
  reducers,
  undefined,
  composeWithDevTools(applyMiddleware(Logger),autoRehydrate())
);

persistStore(store, {storage: AsyncStorage})


export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    const Main = StackNavigator({
      Home: { screen: DecksHome },
      SingleDeck: { screen: SingleDeck },
      AddDeck: { screen: AddDeck },
      QuizManager: { screen: QuizManager },
      Question: { screen: Question },
      AddQuestion: { screen: AddQuestion },
      Result: { screen: Result }
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Main />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55DDE0'
  },
});

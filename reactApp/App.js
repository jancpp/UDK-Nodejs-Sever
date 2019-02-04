// app.js
// to setup environment: 'npm install'
// to run: 'expo start'


import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Linking } from 'react-native';
import io from "socket.io-client";
import { getArticles } from './services/FetchArticles';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      articles: []
    };
  }

  componentDidMount() {
    this.socket = io("http://10.104.135.50:3000"); //use ifconfig for your ip
    this.socket.on("requestArticles", msg => {
      this.setState({ articles: [...this.state.articles, msg] });
    });
  }

  submitMessage() {
    this.socket.emit("requestArticles", this.state.message);
    this.setState({ message: "" });
  }

  render() {
    const articles = this.state.articles.map(message => (
      <Text key={message}>{message}</Text> // TODO: each key should be unique (first {message})
    ));
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'steelblue' }} />
        <View style={{ flex: 1, backgroundColor: 'powderblue', padding: 10 }}>
          <Text style={styles.bigBlueFont}>UDK</Text>
        </View>
        
        <View style={{ flex: 5, backgroundColor: 'steelblue' }} >
          <TextInput
            style={{ height: 40, borderWidth: 2, backgroundColor: 'white' }}
            autoCorrect={false}
            value={this.state.message}
            onSubmitEditing={() => this.submitMessage()}
            onChangeText={message => {
              this.setState({ message });
            }}
          />
          {articles}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  bigBlueFont: {
    color: 'steelblue',
    fontWeight: 'bold',
    fontSize: 30,
  }
});



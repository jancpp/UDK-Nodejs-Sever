// app.js
// firsr run: 'npm install' should install all dependecies
// to run: 'expo start'


import React, { Component } from 'react';
import { Image, FlatList, TouchableHighlight, Text, View, StyleSheet, TextInput, Linking } from 'react-native';
import io from "socket.io-client";
// import { getArticles } from './services/FetchArticles';
const SERVERIP = '192.168.2.189';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: []
    };
  }

  componentDidMount() {
    // listen for socket connection
    this.socket = io('http://' + SERVERIP + ':4000'); //use ifconfig for your ip
    this.socket.on("requestMessages", msg => {
      this.setState({ messages: [...this.state.messages, msg] });
    });

    // fetch from our remote server on port 3000 and break down the json we get back
    return fetch('http://' + SERVERIP + ':3000/api').then((response) => response.json()).then((list) => {
      // once the fetch resolves, run the code here
      // console.log(list);

      // not loading anymore, and we have some new data, the list of card objects we got from the json
      this.setState(
        { loading: false, cards: list },
        function () { }
      );

    }).catch((error) => {
      console.log(error);
    }
    );

  }

  submitMessage() {
    this.socket.emit("requestMessages", this.state.message);
    this.setState({ message: "" });
  }

  render() {

    const messages = this.state.messages.map(message => (
      <Text key={message}>{message}</Text> // TODO: each key should be unique (first {message})
    ));
    return (
      <View style={styles.page}>
        <View style={styles.flatview}>
        <Image source={{ uri: "https://bloximages.chicago2.vip.townnews.com/kansan.com/content/tncms/custom/image/74017260-28ae-11e9-ad8e-bb81b20d5180.jpg", height: 64 }} />
        
        <FlatList
          data={this.state.cards}
          renderItem={function ({ item }) { return (

            <Text style={styles.card}>{item.url}</Text>
              ); }}
          // renderItem={function ({ item }) { return (<Text>{Linking.openURL(item.url)}</Text>); }}
        />
        </View>
        <View style={styles.messages} >
          <TextInput
            style={{ height: 40, borderWidth: 2, backgroundColor: 'white' }}
            autoCorrect={false}
            value={this.state.message}
            onSubmitEditing={() => this.submitMessage()}
            onChangeText={message => {
              this.setState({ message });
            }}
          />
          {messages}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    marginTop: 40,
  },
  flatview: {
    flex: 8,
  }, 
  card: {
    marginTop: 2,
    backgroundColor: '#16367F',
    textAlign: 'left',
    fontSize: 18,
    color: 'white',
    padding: 8,
  },
  messages: {
    flex: 1,
    backgroundColor: 'steelblue',
  }
});






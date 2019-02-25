import React from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, Button, Alert,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
  TouchableWithoutFeedback, ScrollView, FlatList
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";


export default class Translator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: '',
      error: null,
      refreshing: false
    };
  }

    componentDidMount() {
      this.getDefaultData();
    // axios.get('http://localhost:3001').then((response) => response.json()).then((list) => {
    //   // axios.get('http://' + SERVERIP + ':3001/api').then((response) => response.json()).then((list) => {
    //   // once the fetch resolves, run the code here
    //   console.log(list);

    //   // not loading anymore, and we have some new data, the list of card objects we got from the json
    //   this.setState(
    //     { loading: false, cards: list },
    //     function () { }
    //   );

    // }).catch((error) => {
    //   console.log(error);
    // }
    // );
  }

  getDefaultData = () => {
    // const url = `https://randomuser.me/api`;
    const url = `http://10.104.135.50:3001/api`;
    return fetch(url)
      .then((response) => response.json())
      .then((list) => {
        // not loading anymore, and we have some new data, the list of card objects we got from the json
        this.setState(
          { loading: false, data: list },
          function () { }
        );

      }).catch((error) => {
        console.log(error);
      }
      );
  }

  renderNativeItem = (item) => {
    const name = item.first_name + " " + item.last_name;
    return  <ListItem
      title={name}
      subtitle={item.login}
      onPress={() => this.onPressItem(item)} // goto url?
    />;
  }

  _onPressButton() {
    Alert.alert("Congratulations on tapping that button!");
  }

  _onLongPressButton() {
    Alert.alert("You would dare long press this button???");
  }

  render() {
    
    return (

      <View>

        <Image source={{ uri: "https://bloximages.chicago2.vip.townnews.com/kansan.com/content/tncms/custom/image/74017260-28ae-11e9-ad8e-bb81b20d5180.jpg", height: 64 }} />
        
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderNativeItem(item)}
          // renderItem={function ({ item }) {
          //   return (
          //     <Text style={styles.card}>{item.login}</Text>
          //   );
          // }}
        />
      </View>

//       <ScrollView >
//         <View style={{
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <Text style={{ fontSize: 18 }}>{'\nKansas overwhelms short-handed West Virginia roster in 78-53 victory'}</Text>
//           <Text style={{ fontSize: 10 }}>Maddy Tannahill | @maddytannahill   Feb 16, 2019</Text>
//           <Image source={{ uri: "https://bloximages.chicago2.vip.townnews.com/kansan.com/content/tncms/assets/v3/editorial/5/54/55450714-3241-11e9-8ca1-8bc32dfb7918/5c689a8b9c949.image.jpg?resize=750%2C968", width: 230, height: 296 }} />
//           <Text style={{ fontSize: 10 }}>Redshirt sophomore guard K.J. Lawson celebrates after hitting a three against West Virginia. The Jayhawks defeated the Mountaineers 78-53 on Saturday, Feb. 16.</Text>
//           <Text style={{ fontSize: 10, color: "gray" }}>Chance Parker/KANSAN</Text>
//           <Text style={{ fontSize: 12 }}>{'\nWorking with a four-point margin over West Virginia, freshman guard Quentin Grimes drove into a Mountaineer-crowded lane. Immediately double-teamed, the freshman dropped off a nasty no-look pass to junior forward Mitch Lightfoot who brought the roof down in Allen Fieldhouse with a massive dunk, extending the lead to 13-7 for the Jayhawks.'}</Text>
//           <Text style={{ fontSize: 12 }}>{'\nImproving to 9-4 in conference play, the Jayhawks will take a week off before travelling to Lubbock, Texas, to take on Texas Tech in arguably their biggest matchup left in the regular-season schedule.'}</Text>
//         </View>
//         <View style={styles.container}>
//           <TouchableHighlight
//             onPress={this._onPressButton}
//             onLongPress={this._onLongPressButton}
//             underlayColor="white">
//             <View style={styles.button}>
//               <Text style={styles.buttonText}>FaceBook</Text>
//             </View>
//           </TouchableHighlight>
//           <TouchableOpacity
//             onPress={this._onPressButton}>
//             <View style={styles.button}>
//               <Text style={styles.buttonText}>Twitter</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableWithoutFeedback
//             onPress={this._onPressButton}>
//             <View style={styles.button}>
//               <Text style={styles.buttonText}>Email</Text>
//             </View>
//           </TouchableWithoutFeedback>
//           <Button
//             onPress={this._onPressButton}
//             title="other"
//             color="#841584"
//           />
//         </View>
//         <View style={{
//           //justifyContent: 'center',
//           //alignItems: 'center',
//           borderWidth: 5,
//           borderRadius: 20,
//           margin: 5
//         }}>
//           <Button onPress={this._onPressButton}
//             title="Headline - Headline - Headline"
//             color="#000000" />
//           <View style={{
//             flex: 1,
//             flexDirection: 'row',
//             margin: 10,
//             alignItems: 'center'
//           }}>
//             <Image source={{ uri: "https://bloximages.chicago2.vip.townnews.com/kansan.com/content/tncms/assets/v3/editorial/5/54/55450714-3241-11e9-8ca1-8bc32dfb7918/5c689a8b9c949.image.jpg?resize=750%2C968", width: 86, height: 111 }} />
//             <Text style={{ fontSize: 12, margin: 4 }}>{"Blah blah blah blah blah blah blah\nBlah blah blah blah blah blah blah\nBlah blah blah blah blah blah blah\nBlah blah blah blah blah blah blah\nBlah blah blah blah blah blah blah\nBlah blah blah blah blah blah blah\n"}</Text>
//           </View>
//         </View>
//       </ScrollView>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 90,
    height: 30,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    color: 'white'
  },
  card: {
    marginTop: 2,
    backgroundColor: '#16367F',
    textAlign: 'left',
    fontSize: 18,
    color: 'white',
    padding: 8,
  }
});

      






// // app.js
// // firsr run: 'npm install' should install all dependecies
// // to run: 'expo start'

// import React, { Component } from 'react';
// import { Image, FlatList, TouchableHighlight, Text, View, StyleSheet, TextInput, Linking } from 'react-native';
// import io from "socket.io-client";
// import axios from 'axios';
// // import { getArticles } from './services/FetchArticles';
// const SERVERIP = '104.248.235.9';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: "",
//       messages: []
//     };
//   }

//   componentDidMount() {
//     // // listen for socket connection
//     // this.socket = io('http://' + SERVERIP + ':4000'); //use ifconfig for your ip
//     // this.socket.on("requestMessages", msg => {
//     //   this.setState({ messages: [...this.state.messages, msg] });
//     // });

//     // fetch from our remote server on port 3000 and break down the json we get back
//     axios.get('http://localhost:3001').then((response) => response.json()).then((list) => {
//       // axios.get('http://' + SERVERIP + ':3001/api').then((response) => response.json()).then((list) => {
//       // once the fetch resolves, run the code here
//       console.log(list);

//       // not loading anymore, and we have some new data, the list of card objects we got from the json
//       this.setState(
//         { loading: false, cards: list },
//         function () { }
//       );

//     }).catch((error) => {
//       console.log(error);
//     }
//     );
//   }


//   // socket test
//   submitMessage() {
//     this.socket.emit("requestMessages", this.state.message);
//     this.setState({ message: "" });
//   }

//   render() {

//     const messages = this.state.messages.map(message => (
//       <Text key={message}>{message}</Text> // TODO: each key should be unique (first {message})
//     ));
//     return (
//       <View style={styles.page}>
//         <View style={styles.flatview}>
//           <Image source={{ uri: "https://bloximages.chicago2.vip.townnews.com/kansan.com/content/tncms/custom/image/74017260-28ae-11e9-ad8e-bb81b20d5180.jpg", height: 64 }} />

//           <FlatList
//             data={this.state.cards}
//             renderItem={function ({ item }) {
//               return (

//                 <Text style={styles.card}>{item.url}</Text>
//               );
//             }}
//           // renderItem={function ({ item }) { return (<Text>{Linking.openURL(item.url)}</Text>); }}
//           />
//         </View>
//         <View style={styles.messages} >
//           <TextInput
//             style={{ height: 40, borderWidth: 2, backgroundColor: 'white' }}
//             autoCorrect={false}
//             value={this.state.message}
//             onSubmitEditing={() => this.submitMessage()}
//             onChangeText={message => {
//               this.setState({ message });
//             }}
//           />
//           {messages}
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     marginTop: 40,
//   },
//   flatview: {
//     flex: 8,
//   },
//   card: {
//     marginTop: 2,
//     backgroundColor: '#16367F',
//     textAlign: 'left',
//     fontSize: 18,
//     color: 'white',
//     padding: 8,
//   },
//   messages: {
//     flex: 1,
//     backgroundColor: 'steelblue',
//   }
// });






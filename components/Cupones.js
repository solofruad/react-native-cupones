import React from 'react';
import { AppRegistry, Component, Image, StyleSheet, Text, View, ListView} from 'react-native';

const REQUEST_URL = "http://openlabsas.com:1337/cupon/index";

export default class Cupones extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
      dataSource: new ListView.DataSource({ 
        rowHasChanged: (row1, row2) => row1 !== row2, 
      }), 
      loaded: false,
    };
  }
  componentDidMount() {  
      this.fetchData();
    }
    fetchData() { 
      fetch(REQUEST_URL)
      .then((response) => response.json()) 
      .then((responseData) => { 
        this.setState({ 
          dataSource: this.state.dataSource.cloneWithRows(responseData), 
          loaded: true, 
        });
      }) 
      .catch((error)=>{        
        console.log(error);
      });      
    }
  render() {    
    if (!this.state.loaded) { 
      return this.renderLoadingView(); 
    }   
    return ( 
      <ListView dataSource={this.state.dataSource} renderRow={this.renderMovie} style={styles.listView} />
    );  
  }
  renderLoadingView() { 
    return ( 
      <View style={styles.container}> 
        <Text> Loading cupones... </Text> 
      </View> 
    ); 
  }
  renderMovie(movie) {     
    var image = "http://openlabsas.com:1337/"+movie.imageUrl;
    return ( 
      <View style={styles.container}> 
        <Image source={{uri: image}} style={styles.thumbnail} />
        <View style={styles.rightContainer}> 
          <Text style={styles.title}>{movie.title}</Text> 
          <Text style={styles.year}>{movie.categoria}</Text> 
        </View> 
      </View> 
    ); 
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: { 
    flex: 1, 
  },
  title: { 
    fontSize: 20, 
    marginBottom: 8, 
    textAlign: 'center', 
  }, 
  year: { 
    textAlign: 'center', 
  },
  listView: { 
    paddingTop: 20, 
    backgroundColor: '#F5FCFF', 
  },
});
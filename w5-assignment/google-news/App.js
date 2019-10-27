import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button, ScrollView, Linking } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import moment from 'moment';

const API_NEWS = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=fcba09ac3fa841b5a853bf4b9fb7de83&page=${pageNumber}'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: [],
    }
  }
  componentDidMount = () => {
    this.getNews()
  }
  getNews = async () => {
    const response = await fetch(API_NEWS)
    const json = await response.json()
    this.setState({
      data: json.articles,
      loading: false,
    })
  }
  renderArticleItem = ({ item }) => {
    return (
      <Card title={item.title} image={{ uri: item.urlToImage }}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text >{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" onPress={() => this.onPress(item.url)} />
      </Card>
    )
  }
  onPress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }} >
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Articles Count:</Text>
            <Text style={styles.info}>{this.state.data.length}</Text>
          </View>
          <FlatList
            data={this.state.data}
            renderItem={this.renderArticleItem}
            keyExtractor={item => item.title}
            onEndReached={this.getNews}
            ListFooterComponent={<ActivityIndicator size="large" loading={this.state.loading} />}
          />
        </View>
      </ScrollView>
    );
  }
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
});

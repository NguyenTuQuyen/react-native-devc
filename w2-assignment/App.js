import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const images = [
  { id: 1, source: require('./assets/1.png') },
  { id: 2, source: require('./assets/2.png') },
  { id: 3, source: require('./assets/3.png') },
  { id: 4, source: require('./assets/4.png') },
  { id: 5, source: require('./assets/5.png') },
  { id: 6, source: require('./assets/6.png') },
  { id: 7, source: require('./assets/7.png') },
  { id: 8, source: require('./assets/8.png') },
];
export default function App() {
  handlePressFollow = () => {
    alert('followed');
  };
  handlePressSend = () => {
    alert('message sended');
  };
  const centerImg = Math.floor(images.length / 2);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ios-arrow-round-back" size={30} />
        <Feather name="filter" size={20} />
      </View>
      <View style={styles.profileInfo}>
        <Image
          source={require('./assets/quyen.png')}
          style={styles.avatarImg}
        />
        <View style={styles.nameGroup}>
          <Text style={styles.userName}>Quyen Nguyen</Text>
          <Text style={styles.userTitle}>Student</Text>
          <View style={styles.actionGroup}>
            <TouchableHighlight
              style={styles.btnFollow}
              onPress={this.handlePressFollow}>
              <Text style={styles.btnFollowText}>Follow</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnSend}
              onPress={this.handlePressSend}>
              <Ionicons name="md-send" size={20} color="white" />
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={styles.metricGroup}>
        <View style={styles.metricItem}>
          <Text style={styles.metricCount}>210</Text>
          <Text style={styles.metricLabel}>Photo</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricCount}>15k</Text>
          <Text style={styles.metricLabel}>Follower</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricCount}>605</Text>
          <Text style={styles.metricLabel}>Following</Text>
        </View>
      </View>
      <View style={styles.bottomTab}>
        <Feather name="menu" size={20} />
        <AntDesign name="pluscircleo" size={20} />
        <AntDesign name="user" size={20} />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}>
        <View style={styles.cols1}>
          {images.slice(0, centerImg).map(item => {
            return <Image style={styles.imageItem} source={item.source} />;
          })}
        </View>
        <View style={styles.cols2}>
          {images.slice(centerImg).map(item => {
            return <Image style={styles.imageItem} source={item.source} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  avatarImg: {
    width: '90px',
    height: '90px',
    borderRadius: '100px',
  },
  nameGroup: {
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  userTitle: {
    fontSize: '14px',
    opacity: '0.5',
  },
  actionGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
  },
  btnFollow: {
    backgroundColor: '#3C72FF',
    borderRadius: '50px',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginRight: '10px',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  btnFollowText: {
    color: 'white',
  },
  btnSend: {
    backgroundColor: '#56D9FC',
    borderRadius: '50px',
    paddingLeft: '14px',
    paddingRight: '10px',
    marginRight: '20px',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  metricGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  metricCount: {
    fontSize: '20px',
  },
  metricLabel: {
    fontSize: '14px',
    opacity: '0.5',
  },
  cols1: {
    display: 'flex',
    flexDirection: 'column',
    width: '140px',
  },
  cols2: {
    display: 'flex',
    flexDirection: 'column',
    width: '120px',
  },
  imageItem: {
    width: '120px',
    height: '120px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  bottomTab: {
    position: 'fixed',
    bottom: '0',
    zIndex: '100',
    backgroundColor: 'white',
    width: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

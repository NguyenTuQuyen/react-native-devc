import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ActiveScreen() {
  return (
    <View style={styles.container}>
      <Text>Active Screen</Text>
    </View>
  );
}

ActiveScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});
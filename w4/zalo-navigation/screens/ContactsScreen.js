import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <Text>Contacts Screen</Text>
    </View>
  );
}

ContactsScreen.navigationOptions = {
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
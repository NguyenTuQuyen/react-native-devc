import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import messages from "../messages.json";
import MessageCard from "./MessageCard"
import { ScrollView } from 'react-native-gesture-handler';
export default function MessageScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map(msg => {
          return (
            <MessageCard
              key={msg.id}
              name={msg.first_name}
              uri={msg.avatar_url}
              last_message_date={msg.last_message_date}
              last_message_content={msg.last_message_content}
              onGoToConversation={props.navigation.navigate}>

            </MessageCard>
          )
        })}
      </ScrollView>
    </View>
  );
}

MessageScreen.navigationOptions = {
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
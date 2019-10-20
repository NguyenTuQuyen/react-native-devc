import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
const MessageCard = props =>

    <TouchableOpacity
        onPress={() => props.onGoToConversation("Conversation", { ...props })}
    >
        <View style={styles.messageCardStyle}>
            <View>
                <Image style={styles.image} source={{ uri: props.uri }} />
            </View>
            <View style={styles.cardTextContainer}>
                <View style={styles.cardText}>
                    <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
                    <Text>{props.last_message_date}</Text>
                </View>
                <Text numberOfLines={3}>{props.last_message_content}</Text>
            </View>
        </View>
    </TouchableOpacity>

export default MessageCard;
const styles = StyleSheet.create({
});
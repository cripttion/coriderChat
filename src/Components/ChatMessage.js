import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Check, CheckCircle } from 'lucide-react-native';

const ChatMessage = ({ message, isMyMessage, userImage, isKycVerified }) => {
  return (
    <View style={[styles.messageContainer, isMyMessage ? styles.myMessage : styles.otherMessage]}>
      {!isMyMessage && (
        <View style={styles.userInfo}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: userImage }} style={styles.profileImage} />
            {isKycVerified && (
              <View style={styles.kycBadge}>
                <Check size={10} color="#fff" />
              </View>
            )}
          </View>
        </View>
      )}
      <View style={[styles.messageBubble, isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble]}>
        <Text style={isMyMessage ? styles.myMessageText : styles.otherMessageText}>
          {message}
        </Text>
      </View>
      {/* {isMyMessage && (
        <View style={styles.userInfo}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: userImage }} style={styles.profileImage} />
            {isKycVerified && (
              <View style={styles.kycBadge}>
                <Check size={10} color="#fff" />
              </View>
            )}
          </View>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Changed from 'flex-end' to 'flex-start'
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  userInfo: {
    marginHorizontal: 8,
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  kycBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 2,
  },
  messageBubble: {
    // borderRadius: 20,
    padding: 12,
    maxWidth: '100%',
    marginRight:10,
    elevation:5
  },
  myMessageBubble: {
    backgroundColor: '#007bff',
    elevation:5,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderTopRightRadius:10,
  },
  otherMessageBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
  },
  myMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  otherMessageText: {
    color: '#000',
    fontSize: 16,
  },
});

export default ChatMessage;
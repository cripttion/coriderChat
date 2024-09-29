import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Camera, FileDown, Paperclip, SendHorizonal, Video } from 'lucide-react-native';

const SendMessage = () => {
  const [openDocumentModal, setOpenDocumentModal] = useState(false);

  const toggleDocumentModal = () => {
    setOpenDocumentModal(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          placeholder='Reply to @Pulak Raj'
          placeholderTextColor={'gray'}
          style={styles.textInput}
        />
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleDocumentModal}>
            <Paperclip size={22} color={'#000'} />
          </Pressable>
          {openDocumentModal && (
            <View style={styles.popup}>
              <View style={styles.pointer} />
              <View style={styles.popupContent}>
                <Pressable>
                  <Camera size={22} color={'#fff'} />
                </Pressable>
                <Pressable>
                  <Video size={22} color={'#fff'} />
                </Pressable>
                <Pressable>
                  <FileDown size={22} color={'#fff'} />
                </Pressable>
              </View>
            </View>
          )}
          <Pressable>
            <SendHorizonal size={22} color={'#000'} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    elevation:5,
    marginBottom:10,
    borderRadius: 20,

    marginHorizontal:20
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 1, // Add a slight shadow effect
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
    borderRadius: 5,
    color:'#000',
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:20,
  },
  popup: {
    position: 'absolute',
    bottom: 50, // Adjust based on the layout
    left: -60,   // Adjust based on where the icon is
    backgroundColor: 'green',
    borderRadius: 30,
    padding: 15,
    zIndex: 1,
  },
  pointer: {
    position: 'absolute',
     bottom: -5, // Adjust to position the pointer
    left: '70%',
    marginLeft: -5, // Center the pointer
    width: 10,
    height: 10,
    backgroundColor: 'green',
    transform: [{ rotate: '45deg' }], // Create a triangular pointer
  },
  popupContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:20,
  },
});

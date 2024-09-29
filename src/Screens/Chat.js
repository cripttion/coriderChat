import { StyleSheet, Text, View, Image, Pressable, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, Edit, EllipsisVertical } from 'lucide-react-native';
import Options from '../Components/Options';
import ChatMessage from '../Components/ChatMessage';
import SendMessage from '../Components/SendMessage';

const Chat = () => {
  const [data, setData] = useState([]);
  const [chatHeader, setChatHeader] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [optionVisible, setOptionVisible] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const chatRef = useRef(null);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const getChatData = useCallback(async () => {
    if (isLoadingMore) {
      setLoading(true);
    }
    try {
      const response = await fetch(`https://qa.corider.in/assignment/chat?page=${pageNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();

      setData(prevData => [...prevData, ...responseData.chats]);

      if (chatHeader === null) {
        setChatHeader(responseData?.name);
      }

      if (location === null) {
        setLocation({
          from: responseData?.from,
          to: responseData?.to
        });
      }
    } catch (error) {
      console.error(error);
      setError("Unable to fetch the data");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [pageNumber, isLoadingMore]);

  useEffect(() => {
    getChatData();
  }, [getChatData]);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && !onEndReachedCalledDuringMomentum.current) {
      setIsLoadingMore(true);
      setPageNumber(prevPage => prevPage + 1);
      onEndReachedCalledDuringMomentum.current = true;
    }
  }, [isLoadingMore]);

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#000" />
        <Text style={styles.loadingMoreText}>Loading more messages...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.leftPortion}>
          <ArrowLeft size={28} color={'#000'} />
          <Text style={styles.headerText}>{chatHeader || 'Loading...'}</Text>
        </View>
        <Edit size={22} color={'#000'} />
      </View>

      {/* Image and From-To Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/100' }}
          style={styles.circularImage}
        />
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            From <Text style={styles.destination}>{location?.from || 'Loading...'}</Text>
          </Text>
          <Text style={styles.locationText}>
            To <Text style={styles.destination}>{location?.to || 'Loading...'}</Text>
          </Text>
        </View>
        <Pressable onPress={() => setOptionVisible(!optionVisible)}>        
          <EllipsisVertical size={22} color={'#000'} />
        </Pressable>
        {optionVisible && <View style={styles.option}>
          <Options />
        </View>}
      </View>
      <View style={styles.verticalLine} />

      {/* Chat Section */}
      {loading && data.length === 0 ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          ref={chatRef}
          data={data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <ChatMessage
              message={item.message}
              isMyMessage={item.sender.self}
              userImage={item.sender.image}
              isKycVerified={item.sender.is_kyc_verified}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          inverted
          ListFooterComponent={renderFooter}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
        />
      )}
      <View style={styles.sendMessage}>
      <SendMessage />
      </View>
    </View>
  );
};

export default Chat;

// ... (styles remain unchanged)
// ... (styles remain unchanged)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F4',
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  leftPortion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
  },
  imageContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 15,
  },
  circularImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  locationContainer: {
    flex: 1,
    marginRight: 10,
  },
  locationText: {
    color: 'gray',
    fontSize: 16,
  },
  destination: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  verticalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  option: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
    top: 50,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingMoreText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  sendMessage:{
    position:'absolute',
    flex:1,
    width:"100%",
    bottom:0
  }
});

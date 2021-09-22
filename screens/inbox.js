import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
//this is just a sample of other users message
//import initialMessages from './messages';
import { GiftedChat,
         InputToolbar,
         Actions,
         Composer,
         Send,
         Avatar,
         Bubble,
         SystemMessage,
         Message,
         MessageText
} from 'react-native-gifted-chat';
import { db, auth } from '../firebase/firebaseconfig';

export default function inbox() {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
      const unsubscribe = db.collection('chats').orderBy('createdAt', 
      'desc').onSnapshot(snapshot=>setMessages(
        snapshot.docs.map(doc=>({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      ))
      return unsubscribe;
    }, [])
  
    const onSend = (newMessages = []) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
      const message = newMessages[0];
      db.collection('chats').add(message);
    };
  
    return (
      <GiftedChat
        messages={messages}
        text={text}
        onInputTextChanged={setText}
        onSend={messages => onSend(messages)}
        user={{
          _id: '1',
          name: 'test'
          //avatar: 'https://placeimg.com/150/150/any',
        }}
        alignTop
        alwaysShowSend
        scrollToBottom
        // showUserAvatar
        renderAvatarOnTop
        renderUsernameOnMessage
        bottomOffset={26}
        onPressAvatar={console.log}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        //renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        // renderMessageImage
        renderCustomView={renderCustomView}
        isCustomViewBottom
        messagesContainerStyle={{ backgroundColor: 'indigo' }}
        parsePatterns={(linkStyle) => [
          {
            pattern: /#(\w+)/,
            style: linkStyle,
            onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
          },
        ]}
      />
    );
  }

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#222B45',
        paddingTop: 6,
      }}
      primaryStyle={{ alignItems: 'center' }}
    />
  );
  
  const renderActions = (props) => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Image
          style={{ width: 32, height: 32 }}
          source={{
            uri: 'https://placeimg.com/32/32/any',
          }}
        />
      )}
      options={{
        'Choose From Library': () => {
          console.log('Choose From Library');
        },
        Cancel: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  );
  
  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={{
        color: '#222B45',
        backgroundColor: '#EDF1F7',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#E4E9F2',
        paddingTop: 8.5,
        paddingHorizontal: 12,
        marginLeft: 0,
      }}
    />
  );
  
  const renderSend = (props) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <Image
        style={{ width: 32, height: 32 }}
        source={{
          uri: 'https://placeimg.com/32/32/any',
        }}
      />
    </Send>
  );

//   const renderAvatar = (props) => (
//   <Avatar
//     {...props}
//     containerStyle={{ left: { borderWidth: 3, borderColor: 'red' }, right: {} }}
//     imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
//   />
// );

const renderBubble = (props) => (
  <Bubble
    {...props}
    // renderTime={() => <Text>Time</Text>}
    // renderTicks={() => <Text>Ticks</Text>}
    containerStyle={{
      left: { borderColor: 'indigo', borderWidth: 8 },
      right: {},
    }}
    wrapperStyle={{
      left: { borderColor: 'grey', borderWidth: 4 },
      right: {},
    }}
    bottomContainerStyle={{
      left: { borderColor: 'indigo', borderWidth: 4 },
      right: {},
    }}
    tickStyle={{}}
    usernameStyle={{ color: 'grey', fontWeight: '100' }}
    containerToNextStyle={{
      left: { borderColor: 'grey', borderWidth: 4 },
      right: {},
    }}
    containerToPreviousStyle={{
      left: { borderColor: 'mediumorchid', borderWidth: 4 },
      right: {},
    }}
  />
);

const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: 'indigo' }}
    wrapperStyle={{ borderWidth: 10, borderColor: 'indigo' }}
    textStyle={{ color: 'crimson', fontWeight: '900' }}
  />
);

const renderMessage = (props) => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    containerStyle={{
      left: { backgroundColor: 'indigo' },
      right: { backgroundColor: 'indigo' },
    }}
  />
);

const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: { backgroundColor: 'white' },
      right: { backgroundColor: 'white' },
    }}
    textStyle={{
      left: { color: 'black' },
      right: { color: 'black' },
    }}
    linkStyle={{
      left: { color: 'blue' },
      right: { color: 'blue' },
    }}
    customTextStyle={{ fontSize: 24, lineHeight: 24 }}
  />
);

const renderCustomView = ({ user }) => (
  <View style={{ minHeight: 20, alignItems: 'center' }}>
    <Text>
      {user.name}
    </Text>
  </View>
);


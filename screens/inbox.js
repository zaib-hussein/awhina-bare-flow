import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
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
      /*{
        _id,
        createdAt,
        text,
        user
      } = newMessages[0];*/
      db.collection('chats').add(message);
    };

    let user = auth.currentUser;
  
    return (
      <GiftedChat
        messages={messages}
        text={text}
        onInputTextChanged={setText}
        onSend={messages => onSend(messages)}
        user={{
          _id: '1',
          name: 'Test'
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
            uri: 'data:image/png;base64,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',
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
          uri: 'https://static.thenounproject.com/png/3553333-200.png',
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


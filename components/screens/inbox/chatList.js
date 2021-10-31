// import React, { useState, useEffect, useLayoutEffect, useContext, useCallback } from 'react';
// import { View, Text } from 'react-native';
// import {ChannelList, Chat, Search, useTheme, StreamChat} from 'stream-chat-react-native';
// import {
//   STREAM_API_KEY,
//   STREAM_USER_TOKEN,
//   STREAM_USER_ID,
// } from 'react-native-dotenv';

// export default function ChatList({ navigation }){
//   const filters = {
//     members: {$in: [user.id]},
//     type: 'messaging',
//   };

//   const sort = [{last_message_at: -1}];
  
//   const userToken = STREAM_USER_TOKEN;
//   const user = {id: STREAM_USER_ID};

//   const chatClient = StreamChat.getInstance(STREAM_API_KEY);

//   const channels = chatClient.queryChannels(filters, sort, { 
//     watch: true, // this is the default 
//     state: true, 
//   }); 

// //   const additionalFlatListProps = {
// //     keyboardDismissMode: 'on-drag' as const,
// //     getItemLayout: (_: any, index: number) => ({
// //       index,
// //       length: 65,
// //       offset: 65 * index,
// //     }),
// //   };
  
//   const ChannelListScreenProps = () => {
//     navigation.navigate('inbox');
//   };
  
//   const options = {
//     presence: true,
//     state: true,
//     watch: true,
//   };

//   const ChannelListScreen = (ChannelListScreenProps) => {
//     const {setChannel, setChannelWithId} = useContext(AppContext);
  
//     const {
//       theme: {
//         colors: {grey, grey_gainsboro},
//       },
//     } = useTheme();
  
//     const {
//       searchQuery,
//       loading,
//       loadMore,
//       messages,
//       refreshing,
//       refreshList,
//     } = useContext(SearchContext);
  
//     const EmptySearchIndicator = () => (
//       <View style={styles.emptyIndicatorContainer}>
//         <Search height={112} pathFill={grey_gainsboro} width={112} />
//         <Text style={[styles.emptyIndicatorText, {color: grey}]}>
//           {`No results for "${searchQuery}"`}
//         </Text>
//       </View>
//     );
  
//     const onSelect = useCallback(
//       channel => {
//         setChannel(channel);
//         navigation.navigate('Main', {screen: 'inbox'});
//       },
//       [navigation, setChannel],
//     );
  
//     return (
//       <Chat client={chatClient}>
//         <View style={StyleSheet.absoluteFill}>
//           {(!!searchQuery || (messages && messages.length > 0)) && (
//             <MessageSearchList
//               EmptySearchIndicator={EmptySearchIndicator}
//               loading={loading}
//               loadMore={loadMore}
//               messages={messages}
//               refreshing={refreshing}
//               refreshList={refreshList}
//               setChannelWithId={setChannelWithId}
//             />
//           )}
//           <View style={{flex: searchQuery ? 0 : 1}}>
//             <View
//               style={[
//                 styles.channelListContainer,
//                 {opacity: searchQuery ? 0 : 1},
//               ]}>
//               <ChannelList
//                 additionalFlatListProps={additionalFlatListProps}
//                 filters={filters}
//                 HeaderNetworkDownIndicator={() => null}
//                 maxUnreadCount={99}
//                 onSelect={onSelect}
//                 options={options}
//                 Preview={ChannelPreviewMessenger}
//                 sort={sort}
//               />
//             </View>
//           </View>
//         </View>
//       </Chat>
//     );
//   }
// }

//   const styles = StyleSheet.create({
//     channelListContainer: {
//       height: '100%',
//       position: 'absolute',
//       width: '100%',
//     },
//     emptyIndicatorContainer: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingTop: 40,
//     },
//     emptyIndicatorText: {paddingTop: 28},
//     flex: {
//       flex: 1,
//     },
//     searchContainer: {
//       alignItems: 'center',
//       borderRadius: 30,
//       borderWidth: 1,
//       flexDirection: 'row',
//       margin: 8,
//       paddingHorizontal: 10,
//       paddingVertical: 8,
//     },
//     searchInput: {
//       flex: 1,
//       fontSize: 14,
//       includeFontPadding: false, // for android vertical text centering
//       padding: 0, // removal of default text input padding on android
//       paddingHorizontal: 10,
//       paddingTop: 0, // removal of iOS top padding for weird centering
//       textAlignVertical: 'center', // for android vertical text centering
//     },
//   });
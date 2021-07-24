/* eslint-disable react-hooks/exhaustive-deps */
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useState } from "react";
import io, { Socket } from "socket.io-client";
import { SocketService } from "../../pskg/SocketService";
import { Friend } from "../../store/ChatDto";
import {
  fetchFriends,
  fetchMessageFriendAction,
  sendMessageAction,
} from "../../store/ChatThunk";
import { Message } from "./Message/Message";
const ENDPOINT = "http://localhost:3333/";
let socket: Socket;
let socketService: SocketService;

function Chat() {
  const userProfile = useSelector((state: RootState) => state.profile);

  const chatStore = useSelector((state: RootState) => state.chat);
  const [currentFriend, setCurrentFriend] = useState<Friend>();
  const [message, setMessage] = useState(""); // message to send
  const dispatch = useDispatch();
  // fetchFriends
  useEffect(() => {
    if (userProfile.user?.id) {
      dispatch(fetchFriends());
      socket = io(ENDPOINT, {
        withCredentials: true,
        extraHeaders: {
          authrization: userProfile.user?.id,
        },
      });
      socketService = new SocketService(socket, dispatch);
      socketService.initial();
    }
  }, [userProfile.user?.id]);

  function renderFriendList() {
    if (!chatStore.friends) return;
    return chatStore.friends?.map((friend, index) => (
      <div
        className="friend-item"
        key={`${index}-n`}
        onClick={() => {
          setCurrentFriend(friend); //
          fetchMessageFriend(friend.id); //
        }}
      >
        <div className="avatar-container">
          <img className="avatar" src="./vivi.jpg" alt="vivi" />
        </div>
        <span>{friend.name}</span>
      </div>
    ));
  }
  function sendMessage() {
    // TODO update socketId null after logout
    if (currentFriend?.socketId && socketService) {
      socketService.sendMessage({
        friendId: currentFriend.id,
        socketFriendId: currentFriend.socketId,
        userId: userProfile.user?.id || "",
        message,
      });
      return;
    }
    dispatch(
      sendMessageAction({
        userId: userProfile.user?.id || "",
        friendId: currentFriend?.id || "",
        message,
      })
    );
  }
  function renderMessage() {
    return chatStore.message.map((messageItem) => {
      return (
        <Message
          key={messageItem.id}
          content={messageItem.content}
          isSender={messageItem.fromId === userProfile.user?.id.toString()}
        />
      );
    });
  }
  function fetchMessageFriend(friendId: string) {
    // if(friendActive?.id === friendId) return;
    // const friend = chatStore.friends.find(friendItem => friendItem.id === friendId);
    // if(friend?.messages){
    //   dispatch(updateFriendActive(friend));
    //   return;
    // }
    dispatch(fetchMessageFriendAction(friendId));
  }
  return (
    <div className="Chat">
      <div className="room">
        <div className="room-header">
          <div className="friend-item">
            <div className="avatar-container">
              <img className="avatar" src="./vivi.jpg" alt="vivi" />
            </div>
            <span>{currentFriend?.name}</span>
          </div>
        </div>
        <div className="room-mes">
          <div className="message-content"></div>
          <div className="form-send">
            {renderMessage()}
            <div className="form-send-content">
              <input
                type="text"
                className="send-mes"
                autoFocus={true}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>send</button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="contact">
        <div className="header">
          <div className="left">
            <h5>Người liên hệ</h5>
          </div>
          <div className="right">
            <button type="button">
              <img className="icon" src={"./search-solid.svg"} alt="search" />
            </button>
            <button type="button">
              <img className="icon" src={"./user-plus-solid.svg"} alt="add" />
            </button>
          </div>
        </div>
        <div className="list-friend">{renderFriendList()}</div>
      </div>
    </div>
  );
}

export default Chat;

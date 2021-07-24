import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { Friend } from "../store/ChatDto";
import { updateFriend, updateMessage } from "../store/ChatSlice";
import { updateUser, User } from "../store/ProfileSlice";
import {
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  SEND_TO_RESPONSE_AFTER_SEND_MESSAGE,
  UPDATE_OWNER_STATUS_LOGIN,
  UPDATE_STATUS_AFTER_LOGIN,
} from "./Constance";

export type PayloadMessage = {
  userId: string;
  friendId: string;
  socketFriendId: string;
  message: string;
};
export class SocketService {
  constructor(
    private readonly socket: Socket,
    private readonly dispatch: Dispatch
  ) {}
  initial = () => {
    //  update owner status after login
    this.socket.on(UPDATE_OWNER_STATUS_LOGIN, (user: User) => {
      this.dispatch(updateUser(user));
    });

    // update friend when hava other online
    this.socket.on(UPDATE_STATUS_AFTER_LOGIN, (friend: Friend) => {
      this.dispatch(updateFriend(friend));
    });

    // listen event emit to server
    this.recieveMessage();
    this.recieveResponseAfterSendMessage();
  };

  // emit message to someone
  public sendMessage = (payload: PayloadMessage) => {
    this.socket.emit(SEND_MESSAGE, payload);
  };
  private recieveMessage() {
    this.socket.on(RECEIVE_MESSAGE, (payload) => {
      this.dispatch(updateMessage(payload));
    });
  }
  private recieveResponseAfterSendMessage() {
    this.socket.on(SEND_TO_RESPONSE_AFTER_SEND_MESSAGE, (payload) => {
      this.dispatch(updateMessage(payload));
    });
  }
}

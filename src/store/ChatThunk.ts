import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchListFriend,
  fetchMessageFriend,
  sendMessageApi,
} from "../api/UserApi";
import { PayloadMessage } from "./ChatDto";

export const fetchFriends = createAsyncThunk("users/friends", async () => {
  const response = await fetchListFriend();

  return response;
});

export const fetchMessageFriendAction = createAsyncThunk(
  "users/me/friend",
  async (friendId: string, { getState, requestId }) => {
    const response = await fetchMessageFriend(friendId);
    return response;
  }
);
export const sendMessageAction = createAsyncThunk(
  "users/friend/message",
  async (payload: PayloadMessage, { getState, requestId }) => {
    const response = await sendMessageApi(payload);
    return response;
  }
);

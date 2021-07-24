import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Friend, Message, MessageObject } from "./ChatDto";
import {
  fetchFriends,
  fetchMessageFriendAction,
  sendMessageAction,
} from "./ChatThunk";
type InitialState = {
  friends: Friend[];
  message: Message[];
};
const initialState: InitialState = {
  friends: [],
  message: [],
};
// First, create the thunk
export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateFriend: (state, action: PayloadAction<Friend>) => {
      state.friends =
        state.friends &&
        state.friends.map((friend) =>
          friend.id !== action.payload.id ? friend : action.payload
        );
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      state.message = [...state.message, action.payload];
    },
  },
  extraReducers: {
    [fetchFriends.fulfilled.toString()]: (state, action) => {
      state.friends = action.payload;
    },
    [fetchMessageFriendAction.fulfilled.toString()]: (
      state,
      action: PayloadAction<Message[]>
    ) => {
      state.message = action.payload.reverse();
    },
    [sendMessageAction.fulfilled.toString()]: (
      state,
      action: PayloadAction<Message>
    ) => {
      state.message = [...state.message, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFriend, updateMessage } = ChatSlice.actions;

export default ChatSlice.reducer;

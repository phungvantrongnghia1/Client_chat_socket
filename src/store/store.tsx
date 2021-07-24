import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ProfileReduce from "./ProfileSlice";
import ChatReducer from "./ChatSlice";
const store = configureStore({
  reducer: {
     profile: ProfileReduce,
     chat: ChatReducer 
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
export type RootState = ReturnType<typeof store.getState>;

export default store
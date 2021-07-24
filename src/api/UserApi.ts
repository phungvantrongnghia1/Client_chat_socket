import { User } from "../store/ProfileSlice";
import axios, { AxiosResponse } from "axios";
import { Message, PayloadMessage } from "../store/ChatDto";
import { URL_BASE } from "../pskg/Constance";
import { TokenStore } from "../store/TokenStore";
export const loginApi = async (payload: any): Promise<AxiosResponse<any>> => {
  const res = await axios.post(`${URL_BASE}/v1/users/login`, payload, {
    headers: {
      Authorization: TokenStore.getAccessToken(),
    },
  });
  return res;
};
export const fetchListFriend = async (): Promise<User> => {
  const res = await axios.get(`${URL_BASE}/v1/users/me/friend`, {
    headers: {
      Authorization: TokenStore.getAccessToken(),
    },
  });
  return res.data;
};
export const sendMessageApi = async (
  payload: PayloadMessage
): Promise<User> => {
  const res = await axios.post(`${URL_BASE}/v1/users/friend/message`, payload, {
    headers: {
      Authorization: TokenStore.getAccessToken(),
    },
  });
  return res.data;
};

export const fetchMessageFriend = async (
  friendId: string
): Promise<Message[]> => {
  const res = await axios.get(
    `${URL_BASE}/v1/users/friend/message/${friendId}`,
    {
      headers: {
        Authorization: TokenStore.getAccessToken(),
      },
    }
  );
  return res.data;
};

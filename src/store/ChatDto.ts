export type MessageObject =  {
  message: Message[];
  numberOfMessage: number;
  currentPage: number;
}
export type Friend = {
  id: string;
  email: string;
  name: string;
  socketId: string;
  createdAt: Date;
  currentMessage: Message[];
};

export type PayloadMessage = {
  userId: string;
  friendId: string;
  message: string;
};

export type Message = {
  id: string;
  content: string;
  createdAt: Date;
  fromId: string;
  toId: string;
  isFromSender: boolean;
};

export type PayloadFetchMessage = {
  userId: string;
  friendId: string;
};

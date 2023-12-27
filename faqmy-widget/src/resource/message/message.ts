export interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export interface MessageResource {
  id: string;
  text: string;
  created_at: string;
  who: string;
  parent_id: string;
}

export interface InputMessage {
  conversation_id: string;
  text: string;
}

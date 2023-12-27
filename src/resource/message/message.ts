export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  createdAt: Date;
}

export interface MessageResource {
  id: string;
  text: string;
  created_at: string;
  who: string;
  parent_id: string;
}

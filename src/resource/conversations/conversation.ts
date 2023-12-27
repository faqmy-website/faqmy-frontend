import {
  Stack,
  StackResource,
  stackResourceToStack,
} from "@/resource/stack/stack";

export interface ConversationResource {
  id: string;
  created_at: string;
  stack: StackResource;
}

export interface Conversation {
  id: string;
  createdAt: Date;
  stack: Stack;
}

export function conversationResourceToConversation(
  data: ConversationResource
): Conversation {
  return {
    id: data.id,
    createdAt: new Date(data.created_at),
    stack: stackResourceToStack(data.stack),
  };
}

import type {
  Conversation,
  ConversationResource,
} from "@/resource/conversations/conversation";
import { map, Observable } from "rxjs";
import { fmAPI } from "@/utils/axios";
import { conversationResourceToConversation } from "@/resource/conversations/conversation";

const conversationResource = {
  list(): Observable<Conversation[]> {
    return fmAPI
      .get<ConversationResource[]>("/dashboard/conversations")
      .pipe(
        map((data) =>
          data.data.map((item) => conversationResourceToConversation(item))
        )
      );
  },
  remove(id: string): Observable<string> {
    return fmAPI
      .delete(`/dashboard/conversations/${id}`)
      .pipe(map((data) => data.data));
  },
};

export default conversationResource;

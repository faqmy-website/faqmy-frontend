import type {
  ConversationResource,
  InputConversation,
} from "@/resource/conversations/conversation";
import { map, Observable } from "rxjs";
import { fmAPI } from "@/utils/axios";

const conversationResource = {
  create(sid: string): Observable<ConversationResource> {
    const params: InputConversation = {
      stack_id: sid,
    };
    return fmAPI
      .post("/client/conversations", params)
      .pipe(map((data) => data.data));
  },
};

export default conversationResource;

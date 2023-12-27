import { fmAPI } from "@/utils/axios";
import { map, Observable } from "rxjs";
import type { Message, MessageResource } from "@/resource/message/message";

function messageResourceToMessage(data: MessageResource): Message {
  return {
    id: data.id,
    text: data.text,
    isBot: data.who === "bot",
    createdAt: new Date(data.created_at),
  };
}

const messageResource = {
  messages(cid: string): Observable<Message[]> {
    return fmAPI
      .get<MessageResource[]>("/dashboard/messages", {
        params: { conversation_id: cid },
      })
      .pipe(
        map((data) => {
          return data.data.map((item) => {
            return messageResourceToMessage(item);
          });
        })
      );
  },
};

export default messageResource;

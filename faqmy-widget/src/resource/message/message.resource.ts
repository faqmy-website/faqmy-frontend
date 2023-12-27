import { fmAPI } from "@/utils/axios";
import { map, Observable } from "rxjs";
import type {
  InputMessage,
  Message,
  MessageResource,
} from "@/resource/message/message";

function messageResourceToMessage(data: MessageResource): Message {
  return {
    id: data.id,
    text: data.text,
    isBot: data.who === "bot",
  };
}

const messageResource = {
  messages(cid: string, password: string): Observable<Message[]> {
    return fmAPI
      .get<MessageResource[]>("/client/messages", {
        params: { conversation_id: cid, password },
      })
      .pipe(
        map((data) => {
          return data.data
            .map((item) => {
              return messageResourceToMessage(item);
            })
            .reverse();
        })
      );
  },
  createMessage(cid: string, text: string): Observable<Message> {
    const params: InputMessage = {
      conversation_id: cid,
      text,
    };
    return fmAPI.post<MessageResource>("/client/messages", params).pipe(
      map((data) => {
        return messageResourceToMessage(data.data);
      })
    );
  },
};

export default messageResource;

import { map, Observable } from "rxjs";
import { CardResource, InputCard } from "@/resource/card/card";
import { fmAPI } from "@/utils/axios";

const cardResource = {
  list(sid: string, learned?: boolean): Observable<CardResource[]> {
    return fmAPI
      .get<CardResource[]>("/dashboard/cards", {
        params: {
          stack_id: sid,
          learned,
        },
      })
      .pipe(map((data) => data.data));
  },
  create(
    sid: string,
    question: string,
    answer: string
  ): Observable<CardResource> {
    const params: InputCard = {
      stack_id: sid,
      question,
      answer,
    };
    return fmAPI
      .post<CardResource>("/dashboard/cards", params)
      .pipe(map((data) => data.data));
  },
  edit(
    id: string,
    sid: string,
    question: string,
    answer: string
  ): Observable<CardResource> {
    const params: InputCard = {
      stack_id: sid,
      question,
      answer,
    };
    return fmAPI
      .patch<CardResource>(`/dashboard/cards/${id}`, params)
      .pipe(map((data) => data.data));
  },
  scanFile(sid: string, file: File): Observable<CardResource[]> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("stack_id", sid);

    return fmAPI
      .post<CardResource[]>("/dashboard/cards/_upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .pipe(map((data) => data.data));
  },
  scanUrl(sid: string, url: string): Observable<CardResource> {
    const params = {
      stack_id: sid,
      url,
    };
    return fmAPI
      .post<CardResource>("/dashboard/cards/_url", params)
      .pipe(map((data) => data.data));
  },
  remove(id: string): Observable<string> {
    return fmAPI
      .delete(`/dashboard/cards/${id}`)
      .pipe(map((data) => data.data));
  },
  learn(id: string): Observable<string> {
    return fmAPI
      .post(`/dashboard/cards/${id}/learn`)
      .pipe(map((data) => data.data));
  },
};

export default cardResource;

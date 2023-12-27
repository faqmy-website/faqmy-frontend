import { map, Observable } from "rxjs";
import { fmAPI } from "@/utils/axios";
import {
  InputSignIn,
  InputUserCreate,
  Token,
  TokenResource,
} from "@/resource/auth/auth";
import { UserResource } from "@/resource/user/user";
import qs from "qs";

const authResource = {
  singIn(email: string, password: string): Observable<Token> {
    const params: InputSignIn = {
      username: email,
      password,
    };
    return fmAPI
      .post<TokenResource>("/auth/jwt/login", qs.stringify(params), {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .pipe(
        map((result) => {
          return {
            token: result.data.access_token,
            tokenType: result.data.token_type,
          };
        })
      );
  },
  signUp(email: string, password: string): Observable<UserResource> {
    const params: InputUserCreate = {
      email,
      password,
    };
    return fmAPI.post<UserResource>("/auth/signup", params).pipe(
      map((result) => {
        return result.data;
      })
    );
  },
  logout(): Observable<string> {
    return fmAPI.post("/auth/jwt/logout").pipe(
      map((result) => {
        return result.data;
      })
    );
  },
  verifyRequest(email: string): Observable<string> {
    return fmAPI.post("/auth/email/verify/request", { email }).pipe(
      map((result) => {
        return result.data;
      })
    );
  },
  verifyConfirmation(token: string): Observable<UserResource> {
    return fmAPI.post("/auth/email/verify/confirmation", { token }).pipe(
      map((result) => {
        return result.data;
      })
    );
  },
  passwordForgot(email: string): Observable<string> {
    return fmAPI.post("/auth/password/forgot", { email }).pipe(
      map((result) => {
        return result.data;
      })
    );
  },
  passwordReset(password: string, token: string): Observable<string> {
    return fmAPI.post("/auth/password/reset", { password, token }).pipe(
      map((result) => {
        return result.data;
      })
    );
  },
};

export default authResource;

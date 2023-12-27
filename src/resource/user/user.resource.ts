import { Observable, map } from "rxjs";
import { InputUser, UserInfo, UserResource } from "@/resource/user/user";
import { fmAPI } from "@/utils/axios";

function userResourceToUserInfo(data: UserResource): UserInfo {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
  };
}

const userResource = {
  me(): Observable<UserInfo> {
    return fmAPI.get<UserResource>("/auth/me").pipe(
      map((result) => {
        return userResourceToUserInfo(result.data);
      })
    );
  },
  editProfile(params: InputUser): Observable<UserInfo> {
    return fmAPI.patch<UserResource>("/auth/me", params).pipe(
      map((result) => {
        return userResourceToUserInfo(result.data);
      })
    );
  },
};

export default userResource;

import { AxiosResponse } from "axios";
import { ACCESS_TOKEN_KEY } from "../pskg/Constance";

export class TokenStore {
  static get localStorage(): Storage {
    return window.localStorage;
  }
  static setTokenFromResponse(response: AxiosResponse) {
    const accessToken =
      response.headers.authorization || response.headers.Authorization;
    if (accessToken) {
      this.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
  }

  static getAccessToken(): string {
    return this.localStorage.getItem(ACCESS_TOKEN_KEY) || "";
  }
}

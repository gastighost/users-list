import axios, { Axios, AxiosError } from "axios";

class Api {
  axios: Axios;

  constructor() {
    this.axios = axios;

    this.axios.defaults.baseURL = "https://reqres.in/api";
  }

  async getUsers(page?: number) {
    try {
      const response = await this.axios.get("/users", {
        params: {
          page,
        },
      });

      return response;
    } catch (error) {
      const err = error as AxiosError;

      throw err.response;
    }
  }
}

const api = new Api();

export default api;

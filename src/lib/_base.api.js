import axios from "axios"
import useSWR from "swr";

export default class BaseApi {
  static async get(URL) {
    const res = await axios.get(URL)
    return res.data
  }
  static async post(URL, data) {
    return await axios
      .post(URL, data)
      .then(
        (response) => {
          return response
        },
        (error) => {
          throw error
        }
      )
  }
  static async put(URL, data) {
    return await axios
      .put(URL, data)
      .then(
        (response) => {
          return response
        },
        (error) => {
          throw error
        }
      )
  }
  static async patch(URL, data) {
    return await axios
      .patch(URL, data)
      .then(
        (response) => {
          return response
        },
        (error) => {
          throw error
        }
      )
  }

  static async delete(URL) {
    return await axios
      .delete(URL)
      .then(
        (response) => {
          return response
        },
        (error) => {
          throw error
        }
      )
  }
  
}
export function useRequest(request, { initialData, ...config } = {}) {
  return useSWR(
    request ? JSON.stringify(request) : null,
    () =>
      axios(request || {}).then((response) => {
        if (response?.data?.data && !response?.data?.meta)
          return response?.data?.data;
        return response?.data;
      }),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: "InitialData",
        headers: {},
        data: initialData,
      },
    }
  );
}
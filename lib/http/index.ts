import axios from "axios"

export const $aptAPI = axios.create({
  baseURL: "https://almetpt.ru/2020/json",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
})

export const $api = axios.create({
  baseURL: "http://10.0.2.2:4000",
})

import axios from 'axios';

export const HTTP = axios.create({
  baseURL: "https://micro-blog-495b7.firebaseio.com/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json, text/plain, */*"
  },
})
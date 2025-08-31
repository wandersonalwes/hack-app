import axios from "axios";

const APOLOGIST_API_KEY = process.env.EXPO_PUBLIC_APOLOGIST_API_KEY;

export const api = axios.create({
  baseURL: "https://createhack-grupo-15.apologetics.bot/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${APOLOGIST_API_KEY}`,
  },
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchTags = async (inname?: string) => {
  const response = await axios.get(
    `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow&page=1&pageSize=10${
      inname && `&inname=${inname}`
    }`
  );
  return response.data;
};

export const fetchQuestions = async ({ pageParam = 1, queryKey }: any) => {
  const tag = queryKey[1];
  const response = await axios.get(
    `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${tag}&site=stackoverflow&page=${pageParam}&pagesize=20`
  );
  return response.data;
};

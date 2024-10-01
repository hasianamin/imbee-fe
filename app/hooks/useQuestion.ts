import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../services/api";

export const useInfiniteQuestions = (tag: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["questions", tag],
    queryFn: fetchQuestions,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.has_more ? allPages.length + 1 : undefined;
    },
  });
};

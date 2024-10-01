"use client";

import { useCallback, useEffect, useState } from "react";
import { useTags } from "@/app/hooks/useTag";
import { Box, Container, Text } from "@chakra-ui/react";
import TagsWrapper from "./TagsWrapper";
import SearchBar from "./SearchBar";
import QuestionList from "./QuestionList";
import { useInfiniteQuestions } from "@/app/hooks/useQuestion";

export default function QuestionPage() {
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, isLoading, isFetched } = useTags(searchQuery);

  const {
    data: dataQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading: isLoadingQuestions,
  } = useInfiniteQuestions(selectedTag);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (isFetched && data) {
      setSelectedTag(data?.items[0].name);
    }
  }, [data, isFetched]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Container
      maxW="xl"
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "0",
          backgroundColor: "white",
          padding: "1rem .5rem",
          zIndex: 99,
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <Text mt={2}>Trending</Text>
        <TagsWrapper
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          tags={data?.items}
          isLoading={isLoading}
        />
      </Box>
      <Box sx={{ marginTop: "1rem" }}>
        <QuestionList
          data={dataQuestions}
          isLoading={isLoadingQuestions}
          isFetchingNextPage={isFetchingNextPage}
          error={error}
        />
      </Box>
    </Container>
  );
}

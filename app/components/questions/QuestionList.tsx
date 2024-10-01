/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Card,
  Avatar,
  Flex,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";
import { FC } from "react";
import { Question } from "@/app/utils/types";

type SmallCapsuleType = {
  title: string;
  count: number;
  color?: string;
  backgroundColor?: string;
};

const SmallCapsule: FC<SmallCapsuleType> = ({
  backgroundColor = "white",
  color = "black",
  title,
  count,
}) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        border: "1px solid black",
        padding: "2px 4px",
        borderRadius: "10px",
        fontSize: "12px",
        color,
        backgroundColor,
      }}
    >
      {title}: {count}
    </Flex>
  );
};

const QuestionCard: FC<Question> = ({ ...props }) => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`);

  return (
    <Card
      sx={{
        width: "100%",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "whitesmoke",
        },
      }}
      direction={{ base: "column", sm: "row" }}
      variant="outline"
      p={2}
      onClick={() => window.open(props.link, "_blank")}
    >
      <Flex alignItems={"center"} gap={2} width={"100%"}>
        <Flex
          sx={{ height: "100%" }}
          pt={4}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Avatar
            height={isMobile ? 8 : 12}
            width={isMobile ? 8 : 12}
            name={props.owner.display_name || ""}
            src={props.owner.profile_image}
          />
        </Flex>
        <Box
          sx={{
            marginRight: "1rem",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }} py="2">
            {props.title}
          </Box>
          <Flex flexDirection="row-reverse" gap={2}>
            <SmallCapsule title="Viewed" count={props.view_count} />
            <SmallCapsule
              backgroundColor={props.is_answered ? "#15B392" : "#F5F5F7"}
              title="Answers"
              count={props.answer_count}
            />
            <SmallCapsule
              backgroundColor={props.score < 0 ? "#C96868" : "#F5F5F7"}
              title="Score"
              count={props.score}
            />
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

const QuestionList = ({ ...props }) => {
  const { data, isFetchingNextPage, isLoading, error } = props;

  if (isLoading) {
    return (
      <Flex flexDirection="column" gap={2}>
        {new Array(8).fill(1).map((_item, index: number) => {
          return (
            <Skeleton key={index} sx={{ width: "100%", height: "80px" }} />
          );
        })}
      </Flex>
    );
  }
  if (error) return <p>Error loading questions</p>;
  return (
    <Box>
      {data?.pages.map((data: any) =>
        data?.items.map((question: any) => (
          <QuestionCard {...question} key={question.id} />
        ))
      )}
      {isFetchingNextPage &&
        new Array(3).fill(0).map((_item, index) => {
          return (
            <Skeleton
              key={index}
              sx={{ width: "100%", height: "80px", marginBottom: "1rem" }}
            />
          );
        })}
    </Box>
  );
};

export default QuestionList;

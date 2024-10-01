/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Skeleton } from "@chakra-ui/react";
import { FC } from "react";

type TagItem = {
  selectedTag: string;
  setSelectedTag: (e: string) => void;
  tag: string;
};

type TagWrapper = {
  selectedTag: string;
  setSelectedTag: (e: string) => void;
  tags: string[];
  isLoading: boolean;
};

const CapsuleWrapper: FC<TagItem> = ({ selectedTag, setSelectedTag, tag }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      sx={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        borderRadius: "8px",
        padding: "6px 8px",
        backgroundColor: selectedTag === tag ? "#F7CD1C" : "#FFF",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#F7CD1C",
        },
      }}
      onClick={() => setSelectedTag(tag)}
    >
      {tag}
    </Flex>
  );
};

const TagsWrapper: FC<TagWrapper> = ({
  isLoading,
  tags,
  selectedTag,
  setSelectedTag,
}) => {
  if (isLoading) {
    return (
      <Flex gap={2}>
        {new Array(5).fill(1).map((_item: number, index: number) => {
          return (
            <Skeleton
              key={index}
              sx={{
                padding: "1rem 2rem",
              }}
            />
          );
        })}
      </Flex>
    );
  }
  return (
    <Flex gap={2} flexWrap="wrap">
      {tags?.map((tag: any, index: number) => {
        return (
          <CapsuleWrapper
            key={index}
            selectedTag={selectedTag}
            tag={tag.name}
            setSelectedTag={setSelectedTag}
          />
        );
      })}
    </Flex>
  );
};

export default TagsWrapper;

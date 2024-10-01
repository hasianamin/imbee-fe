import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <InputGroup>
      <Input
        placeholder="Search tags"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <InputRightElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;

import { CustomCategory } from "../types";
import { Categories } from "./categorise";
import { SearchInput } from "./search-input";

interface Props {
  data: CustomCategory[];
}

export const SearchFilter = ({ data }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
        <SearchInput></SearchInput>
        <div className="hidden lg:block">
        <Categories data={data}></Categories>
        </div>
    </div>
  );
};

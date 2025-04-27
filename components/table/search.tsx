"use client";
import { useState } from "react";

const SearchField = () => {
  // search state
  const [search, setSearch] = useState<string>("");
  // handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">All Users</h1>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 w-52 md:w-80 rounded px-4 py-2"
        />
      </div>
    </div>
  );
};

export default SearchField;

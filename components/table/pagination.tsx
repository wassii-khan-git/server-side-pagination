"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  limit: number;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  limit,
}: PaginationControlsProps) => {
  // router
  const router = useRouter();
  // search params
  const params = useSearchParams();
  // rows per page state
  const [rowsPerPage, setRowsPerPage] = React.useState(limit);
  // handle rows per page change
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rowsPerPageLimit = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPageLimit);
    const searchParams = new URLSearchParams(params.toString());
    searchParams.set("limit", rowsPerPageLimit.toString());
    searchParams.set("page", "1"); // Reset to first page on rows per page change
    router.replace(`?${searchParams.toString()}`);
  };
  // handle next change
  const handleNextPage = () => {
    const searchParams = new URLSearchParams(params.toString());
    searchParams.set("page", (currentPage + 1).toString());
    router.replace(`?${searchParams.toString()}`);
  };

  // handle previous change
  const handlePreviousPage = () => {
    const searchParams = new URLSearchParams(params.toString());
    searchParams.set("page", (currentPage - 1).toString());
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex items-center space-x-2">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
          onChange={handlePageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="border border-gray-300 rounded px-4 py-2 disabled:opacity-50 cursor-pointer"
          onClick={handlePreviousPage}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <span>
          Pages {currentPage} of {totalPages}
        </span>
        <button
          className="border border-gray-300 rounded px-4 py-2 disabled:opacity-50 cursor-pointer"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;

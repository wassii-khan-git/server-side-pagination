"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  currentLimit: number;
  totalPages: number;
}

const PaginationControls = ({
  currentPage,
  currentLimit,
  totalPages,
}: PaginationControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rowsPerPage, setRowsPerPage] = React.useState(currentLimit);

  const handleRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.set("page", "1"); // Reset to first page
    setRowsPerPage(newLimit);
    router.replace(`?${params.toString()}`);
  };

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (currentPage + 1).toString());
    router.replace(`?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (currentPage - 1).toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex items-center space-x-2">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPage}
          className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage <= 1}
          className="border border-gray-300 rounded px-4 py-2 disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="border border-gray-300 rounded px-4 py-2 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;

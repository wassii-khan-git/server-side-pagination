import { getUsers } from "@/lib/services/users";
import { columns } from "../(common)/table/columns";
import { DataTable } from "../(common)/table/data-table";
import PaginationControls from "../(common)/pagination";

export default async function ServerSidePagination({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  // get the page and limit from the search params
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "5", 10);
  // fetch the data from the server
  const response = await getUsers(page, limit);
  // Data
  const data = response?.data;
  // current page
  const currentPage = response?.currentPage;
  // total count
  const totalPages = response?.totalPages;

  console.log("currentPage", currentPage);
  console.log("totalPages", totalPages);
  console.log("data", data);

  return (
    <div className="mt-36">
      {/* title and search */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">All Users</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 w-80 rounded px-4 py-2"
          />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
      {/* pagination */}
      <PaginationControls
        currentPage={currentPage}
        currentLimit={limit}
        totalPages={totalPages}
      />
    </div>
  );
}

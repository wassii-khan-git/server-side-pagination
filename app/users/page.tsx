import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import PaginationControls from "@/components/table/pagination";
import SearchField from "@/components/table/search";
import { getUsers } from "@/lib/services/users";

export default async function ServerSidePagination({
  searchParams,
}: {
  page?: string;
  limit?: string;
}) {
  // get the page and limit from the search params
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "5", 10);
  // fetch the data from the server
  const response = await getUsers(page, limit);
  // get the data from the response
  const data = response.data;
  // get the total pages and current page from the response
  const totalPages = response.pagination.totalPages;
  const currenPage = response.pagination.currentPage;

  return (
    <div className="mt-16">
      {/* title and search */}
      <SearchField />
      {/* DataField */}
      <DataTable columns={columns} data={data} />
      {/* pagination */}
      <PaginationControls
        currentPage={currenPage}
        totalPages={totalPages}
        limit={limit}
      />
      ,
    </div>
  );
}

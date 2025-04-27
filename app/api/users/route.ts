import { NextRequest, NextResponse } from "next/server";
import { generateRandomUsers } from "@/lib/helper";
export async function GET(req: NextRequest) {
  // URL
  const url = new URL(req.url);
  // Page and limit
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");

  if (page === null || limit === null) {
    return NextResponse.json(
      { message: "Page and limit are required" },
      { status: 400 }
    );
  }

  const data = generateRandomUsers(10000);
  console.log("data", data);

  // Pagination
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);
  const paginatedData = data.slice(start, end);
  console.log("paginatedData", paginatedData);

  // Total pages
  const totalPages = Math.ceil(data.length / Number(limit));
  // Response
  const paginationInfo = {
    data: paginatedData,
    totalPages,
    currentPage: Number(page),
    totalCount: data.length,
  };
  // Return response
  return NextResponse.json(paginationInfo, { status: 200 });
}

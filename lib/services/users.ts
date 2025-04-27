import { Users } from "@/components/table/columns";

export async function getUsers(
  page?: number,
  limit?: number
): Promise<Users[]> {
  // Replace the following line with actual data fetching logic
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response;
}

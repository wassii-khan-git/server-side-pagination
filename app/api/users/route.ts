import { NextRequest, NextResponse } from "next/server";
import DatabaseConnection from "@/lib/db/connect";
import userModel from "@/lib/models/user-model";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Validate parameters
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return NextResponse.json(
        { message: "Invalid page or limit parameters" },
        { status: 400 }
      );
    }

    // Connect to database first
    await DatabaseConnection();

    // await generateAndInsertUsers(100);

    // Calculate pagination values
    const skip = (page - 1) * limit;

    // Get paginated data
    const users = await userModel.find().skip(skip).limit(limit).lean();

    // Get total count
    const totalCount = await userModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    // Create response structure
    const response = {
      data: users,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        itemsPerPage: limit,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in users route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import userModel from "../models/user-model";
import { faker } from "@faker-js/faker";
// This function will generate random user data for testing purposes. It uses the faker library to create realistic names, emails, and statuses.
export const generateRandomUsers = (count: number) => {
  const users = Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(["single", "married", "divorced"]),
    // Add other fields that match your User schema
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  return users;
};

// In your GET route handler
export const generateAndInsertUsers = async (count: number) => {
  try {
    const fakeUsers = generateRandomUsers(count);
    await userModel.insertMany(fakeUsers);
    console.log(`Successfully inserted ${count} users`);
  } catch (error) {
    console.error("Error inserting users:", error);
    throw error;
  }
};

// This function will generate random user data for testing purposes. It uses the faker library to create realistic names, emails, and statuses.
export const generateRandomUsers = (count: number) => {
  const users = Array.from({ length: count }, (_, index) => ({
    id: index.toString(),
    name: `User ${index + 1}`,
    status: Math.random() > 0.5 ? "single" : "married",
    email: `user${index + 1}@gmail.com`,
  }));
  return users;
};

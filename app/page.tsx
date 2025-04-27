import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2 mt-16">
      <header>
        <h1 className="text-4xl font-medium">Welcome to Next JS</h1>
      </header>
      <main className="mt-5 text-center text-lg text-gray-700">
        <p>
          This is a server-side pagination example. Please navigate to the
          appropriate page to see the implementation. Technologies here are:
        </p>
        <ul className="list-disc list-inside mt-2 text-left">
          <li>Next.js</li>
          <li>React</li>
          <li>TypeScript</li>
          <li>TanStack Table</li>
          <li>Tailwind CSS</li>
        </ul>
      </main>
    </div>
  );
};

export default Home;

// src/app/components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white bg-opacity-90 p-4 shadow-inner backdrop-blur-md mt-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-700 text-sm sm:text-base">
          Built by{" "}
          <a
            href="https://github.com/itsmeenavi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            itsmeenavi
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

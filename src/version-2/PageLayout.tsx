import React from "react";

const bgColor = "#e0e7ef"; // soft blue-gray, easy on the eyes

interface PageLayoutProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div
      style={{ minHeight: "100vh", background: bgColor }}
      className="flex items-center justify-center py-8"
    >
      <div
        className="bg-white border border-gray-300 rounded-xl shadow-md w-full max-w-[500px] p-6"
        style={{ boxSizing: "border-box" }}
      >
        {title && (
          <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

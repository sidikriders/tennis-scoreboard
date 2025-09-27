import React from "react";

const parentBgColor = "#b6c6d8"; // slightly darker blue-gray for the outer background
const bgColor = "#e0e7ef"; // soft blue-gray, easy on the eyes

interface PageLayoutProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  titleIcon?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  titleIcon,
  children,
}) => {
  return (
    <div
      style={{ background: parentBgColor }}
      className="flex items-center justify-center min-h-screen"
    >
      {!!title && typeof title === "string" && <title>{title}</title>}
      <div
        className="bg-white border border-gray-300 shadow-md w-full max-w-[500px] p-3 min-h-[500px]"
        style={{ boxSizing: "border-box", backgroundColor: bgColor }}
      >
        {title && (
          <h1 className="text-2xl font-bold mb-4 text-center">
            {!titleIcon ? (
              title
            ) : (
              <span>
                {titleIcon} {title}
              </span>
            )}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

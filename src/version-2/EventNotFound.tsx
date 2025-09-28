import { MoveLeft } from "lucide-react";
import React from "react";
import { defaultQueryParams, useAppQueryParams } from "../utils";

const EventNotFound: React.FC<{ text?: string }> = (props) => {
  const [, setQueryParams] = useAppQueryParams();
  return (
    <div className="text-center mt-10">
      <p className="text-red-500 text-xl font-semibold">
        {props.text || "Event not found."}
      </p>
      <p
        className="text-sm hover:underline hover:cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => setQueryParams(defaultQueryParams({}))}
      >
        <MoveLeft className="inline-block mr-2 w-2 h-2" /> Back to Homepage
      </p>
    </div>
  );
};

export default EventNotFound;

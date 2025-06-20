import React from "react";

interface TipBoxProps {
  children: React.ReactNode;
}

const TipBox: React.FC<TipBoxProps> = ({ children }) => (
  <div className="mb-4 rounded-md border border-blue-500 bg-blue-900/40 p-4 text-blue-100">
    <strong className="font-semibold">Tip:</strong> {children}
  </div>
);

export default TipBox;

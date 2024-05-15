import React from "react";
import { useSelector } from "react-redux";

const DisplayItems = () => {
  const availableFiles = useSelector((state) => state.files.files);

  return <div>DisplayItems</div>;
};

export default DisplayItems;

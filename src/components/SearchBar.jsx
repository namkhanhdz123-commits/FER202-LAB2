import React, { useRef } from "react";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);
  return (
    <div className="container mt-4">
      <input
        ref={inputRef}
        type="text"
        className="form-control form-control-lg"
        placeholder="tìm tên phim......."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

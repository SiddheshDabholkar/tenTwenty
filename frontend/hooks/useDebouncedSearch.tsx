import React, { useEffect } from "react";

const useDebouncedSearch = ({ search = "", time = 500 }) => {
  const [debouncedSearch, setDebouncedSearch] = React.useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [search, time]);

  return debouncedSearch;
};

export default useDebouncedSearch;

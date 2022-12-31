import React from "react";
import { Paginate, PaginateItem } from "./style";

const Pagination = ({ posts, counts, limit, pageNumber, setPageNumber }) => {
  const handlePage = (pageNumber) => {
    setPageNumber(pageNumber);
  };
  return (
    <Paginate>
      {posts.length
        ? [...Array(Math.ceil(counts / limit))].map((_, index) => {
            const numberPage = ++index;
            return (
              <PaginateItem
                className={`${numberPage === pageNumber ? "active" : ""}`}
                key={numberPage}
                onClick={() => handlePage(numberPage)}
              >
                {numberPage}
              </PaginateItem>
            );
          })
        : null}
    </Paginate>
  );
};

export default Pagination;

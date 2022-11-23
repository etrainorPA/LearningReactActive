import ReactPaginate from "react-paginate";

import { useState } from "react";
import "./Paginator.css";

const Paginator = ({ pagesNeeded, pets, animal, resultsNumber, setPets }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 10;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const pageCount = pagesNeeded;

  console.log(pets);

  async function GetPets(pageNumber) {
    console.log("page number requested: " + pageNumber);
    console.log("animal is: " + animal);
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&page=${pageNumber}`
    );
    const json = await res.json();
    console.log(json);
    setPets(json.pets);
  }

  const handlePageClick = (event) => {
    GetPets(event.selected);
    console.log("event:" + event);
    const newOffset = (event.selected * 10) % resultsNumber;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <p>{pagesNeeded}</p>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={9}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Paginator;

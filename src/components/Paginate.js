import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { setPaginate } from "../reducers/email";

const ITEMS_PER_PAGE = process.env.REACT_APP__EMAIL_ITEMS_PER_PAGE;

function Paginate() {
  const dispatch = useDispatch();
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const emailData = useSelector((state) => state.email.value);
  const emailCount = emailData.unRead.length;

  let displayCurrentPage = emailData.currentPage * ITEMS_PER_PAGE;
  displayCurrentPage =
    displayCurrentPage > emailCount ? emailCount : displayCurrentPage;

  const paginate = useCallback(
    (currPage, action) => {
      let currentItems = emailData.unRead;
      let currentPage = currPage || 1;
      let endIndex = ITEMS_PER_PAGE * currentPage;
      let startIndex = endIndex - ITEMS_PER_PAGE;
      let totalPage = Math.ceil(emailData.unRead.length / ITEMS_PER_PAGE);

      if (action === "next") {
        startIndex = endIndex;
        endIndex = endIndex + ITEMS_PER_PAGE;
        currentPage++;
      } else if (action === "prev") {
        endIndex = startIndex;
        startIndex = startIndex - ITEMS_PER_PAGE;
        currentPage--;
      }

      currentItems = currentItems.slice(startIndex, endIndex);

      dispatch(
        setPaginate({
          currentItems,
          currentPage,
          totalPage,
        })
      );

      setIsFirst(currentPage === 1);
      setIsLast(currentPage === totalPage);
    },
    [dispatch, emailData.unRead]
  );

  const handleClickPrev = () => {
    paginate(emailData.currentPage, "prev");
  };

  const handleClickNext = () => {
    paginate(emailData.currentPage, "next");
  };

  useEffect(() => {
    paginate(1);
  }, [paginate]);

  return (
    <>
      {emailData.unReadCurrentItems.length > 0 && (
        <>
          <button
            type="button"
            disabled={isFirst}
            onClick={() => handleClickPrev()}
            data-cy="nav-prev"
            className={`${
              isFirst ? "" : "hover:bg-gray-light"
            } pl-1 border border-gray rounded mr-2 disabled:opacity-50`}
          >
            <ArrowBackIosIcon fontSize="small" />
          </button>
          <span>
            {displayCurrentPage} of {emailCount}
          </span>
          <button
            type="button"
            disabled={isLast}
            onClick={() => handleClickNext()}
            data-cy="nav-next"
            className={`${
              isLast ? "" : "hover:bg-gray-light"
            } px-1 border border-gray rounded ml-2 disabled:opacity-50`}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </>
      )}
    </>
  );
}

export default Paginate;

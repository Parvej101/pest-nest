// src/components/shop/Pagination.jsx

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="join mt-12 flex justify-center">
      <button
        className="join-item btn"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        <IoChevronBack />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`join-item btn ${
            currentPage === page ? "btn-primary" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="join-item btn"
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      >
        <IoChevronForward />
      </button>
    </div>
  );
};

export default Pagination;

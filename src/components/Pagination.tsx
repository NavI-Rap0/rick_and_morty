// знаю що виглядає жахливо, але я не знаю як краще зробити

import { PaginationProps } from '../utils/types';
import { createPageRange } from '../helpers/paginationHelpers';
import { PAGE_DIRECTIONS } from '../utils/constants';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = createPageRange(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {pages.map((page, index) => {
        if (typeof page === "number") {
          return (
            <a
              key={index}
              href={onPageChange(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-blue-700 text-white font-bold"
                  : "bg-gray-300 text-gray-700"
              } hover:scale-110 transition-all duration-200`}
            >
              {page === currentPage ? `${page}` : page}
            </a>
          );
        }

        if (page === PAGE_DIRECTIONS.PREV) {
          return (
            <a
              key={index}
              href={onPageChange(currentPage - 1)}
              className="px-3 py-1 rounded bg-gray-300 text-gray-700 font-bold hover:scale-110 transition-all duration-200"
            >
              {PAGE_DIRECTIONS.PREV}
            </a>
          );
        }

        if (page === PAGE_DIRECTIONS.NEXT) {
          return (
            <a
              key={index}
              href={onPageChange(currentPage + 1)}
              className="px-3 py-1 rounded bg-gray-300 text-gray-700 font-bold hover:scale-110 transition-all duration-200"
            >
              {PAGE_DIRECTIONS.NEXT}
            </a>
          );
        }

        return (
          <span
            key={index}
            className="px-3 py-1 text-gray-500 select-none"
            aria-hidden="true"
          >
            {page}
          </span>
        );
      })}
    </div>
  );
}

import { Filters } from "@/utils/types";
import { createPageRange } from "../helpers/paginationHelpers";
import { PAGE_DIRECTIONS } from "../utils/constants";

export default function Pagination({
  currentPage,
  totalPages,
  buildPageUrl,
}: PaginationProps) {
  if (typeof buildPageUrl !== "function") {
    console.error("buildPageUrl is not a function");
    return null;
  }

  const pages = createPageRange(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {pages.map((page, index) => {
        if (typeof page === "number") {
          return (
            <a
              key={index}
              href={buildPageUrl({}, page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-200
                ${page === currentPage ? "bg-blue-700 text-white" : "bg-gray-300/50 text-gray-700 hover:bg-gray-300/80 hover:scale-110"}`}
            >
              {page}
            </a>
          );
        }

        if (page === PAGE_DIRECTIONS.PREV || page === PAGE_DIRECTIONS.NEXT) {
          return (
            <a
              key={index}
              href={buildPageUrl({}, page === PAGE_DIRECTIONS.PREV ? currentPage - 1 : currentPage + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300/50 text-gray-700 font-bold hover:bg-gray-300/80 hover:scale-110 transition-all duration-200"
            >
              {page === PAGE_DIRECTIONS.PREV ? "<" : ">"}
            </a>
          );
        }

        return (
          <span
            key={index}
            className="w-10 h-10 flex items-center justify-center text-gray-500 select-none"
            aria-hidden="true"
          >
            {page}
          </span>
        );
      })}
    </div>
  );
}

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  buildPageUrl: (filters: Filters, page: number) => string;
};

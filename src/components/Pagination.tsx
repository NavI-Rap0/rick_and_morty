type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => string; // Генерація URL
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const createPageRange = () => {
    const range: (string | number)[] = [];
    const visiblePages = 2;

    if (currentPage > 1) {
      range.push("←");
    }

    if (currentPage > visiblePages + 1) {
      range.push(1, "...");
    }

    const startPage = Math.max(1, currentPage - visiblePages);
    const endPage = Math.min(totalPages, currentPage + visiblePages);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalPages - 1) {
      range.push("...", totalPages);
    }

    if (currentPage < totalPages) {
      range.push("→");
    }

    return range;
  };

  const pages = createPageRange();

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

        if (page === "←") {
          return (
            <a
              key={index}
              href={onPageChange(currentPage - 1)}
              className="px-3 py-1 rounded bg-gray-300 text-gray-700 font-bold hover:scale-110 transition-all duration-200"
            >
              ←
            </a>
          );
        }

        if (page === "→") {
          return (
            <a
              key={index}
              href={onPageChange(currentPage + 1)}
              className="px-3 py-1 rounded bg-gray-300 text-gray-700 font-bold hover:scale-110 transition-all duration-200"
            >
              →
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

import { PAGE_DIRECTIONS, VISIBLE_PAGES } from '../utils/constants';
import { PageRange } from '../utils/types';

export const createPageRange = (currentPage: number, totalPages: number): PageRange => {
  const range: PageRange = [];

  if (currentPage > 1) {
    range.push(PAGE_DIRECTIONS.PREV);
  }

  if (currentPage > VISIBLE_PAGES + 1) {
    range.push(1, PAGE_DIRECTIONS.ELLIPSIS);
  }

  const startPage = Math.max(1, currentPage - VISIBLE_PAGES);
  const endPage = Math.min(totalPages, currentPage + VISIBLE_PAGES);

  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  if (endPage < totalPages - 1) {
    range.push(PAGE_DIRECTIONS.ELLIPSIS, totalPages);
  }

  if (currentPage < totalPages) {
    range.push(PAGE_DIRECTIONS.NEXT);
  }

  return range;
};

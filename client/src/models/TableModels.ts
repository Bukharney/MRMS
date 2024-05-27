import { t } from "mobx-state-tree";

export const TableModel = t.model("TableModel", {
  currentPage: t.number,
  totalPages: t.number,
  totalItems: t.number,
  limit: t.number,
  searchTitle: t.string,
  searchYear: t.number,
  searchRating: t.string,
});

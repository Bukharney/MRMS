import api from "@/lib/api/movie";
import { t } from "mobx-state-tree";

export const MovieModel = t
  .model("MovieModel", {
    _id: t.identifier,
    title: t.string,
    year: t.number,
    rating: t.enumeration(["G", "PG", "M", "MA", "R"]),
  })
  .actions((self) => ({
    updateTitle(title: string) {
      self.title = title;
    },
    updateYear(year: number) {
      self.year = year;
    },
    updateRating(rating: string) {
      self.rating = rating;
    },

    async addMovie(title: string, year: number, rating: string) {
      return await api.addMovie(title, year, rating);
    },

    async updateMovie(id: string, title: string, year: number, rating: string) {
      return await api.updateMovie(id, title, year, rating);
    },

    async removeMovie(id: string) {
      return await api.removeMovie(id);
    },
  }));

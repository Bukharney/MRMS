import { Instance, t } from "mobx-state-tree";
import { MovieModel } from "./MovieModel";
import { TableModel } from "./TableModels";
import { UserModel } from "./UserModels";

export const RootStore = t
  .model("RootStore", {
    movies: t.array(MovieModel),
    table: TableModel,
    user: UserModel,
    movie: MovieModel,
  })
  .actions((store) => ({
    getMovies(data: Instance<typeof MovieModel>[]) {
      store.movies.replace(data);
    },

    addMovie(title: string, year: number, rating: string) {
      const _id = Math.random().toString(36);
      const movie = MovieModel.create({ _id, title, year, rating });
      store.movies.unshift(movie);
    },
    updateMovie(id: string, title: string, year: number, rating: string) {
      const index = store.movies.findIndex((m) => m._id === id);
      const movie = MovieModel.create({ _id: id, title, year, rating });
      store.movies[index] = movie;
    },
    removeMovie(_id: string) {
      const index = store.movies.findIndex((m) => m._id === _id);
      store.movies.splice(index, 1);
    },

    calculateTotalPages(limit: number) {
      store.table.totalPages = Math.ceil(store.movies.length / limit);
    },
    nextPage() {
      store.table.currentPage += 1;
    },
    prevPage() {
      store.table.currentPage -= 1;
    },
    updateSearchTitle(title: string) {
      store.table.searchTitle = title;
    },
    updateSearchYear(year: number) {
      store.table.searchYear = year;
    },
    updateSearchRating(rating: string) {
      store.table.searchRating = rating;
    },
  }))
  .views((store) => ({
    getMoviesByPage(
      page: number,
      limit: number,
      movies: Instance<typeof MovieModel>[]
    ) {
      const start = (page - 1) * limit;
      const end = start + limit;
      if (!movies) return [];
      return movies.slice(start, end);
    },

    searchMovie(title: string, year: number, rating: string) {
      return store.movies.filter((m) => {
        if (!title && !year && !rating) return true;
        if (!title && !year) return m.rating === rating;
        if (!title && !rating) return m.year === year;
        if (!year && !rating)
          return m.title.toLowerCase().includes(title.toLowerCase());
        if (!title) return m.year === year && m.rating === rating;
        if (!year)
          return (
            m.title.toLowerCase().includes(title.toLowerCase()) &&
            m.rating === rating
          );
        if (!rating)
          return (
            m.title.toLowerCase().includes(title.toLowerCase()) &&
            m.year === year
          );
        return (
          m.title.toLowerCase().includes(title.toLowerCase()) &&
          m.year === year &&
          m.rating === rating
        );
      });
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      movies: [],
      table: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        limit: 10,
        searchTitle: "",
        searchYear: 0,
        searchRating: "",
      },
      user: {
        id: "",
        username: "",
        email: "",
        role: "floorstaff",
        password: "",
      },
      movie: {
        _id: "",
        title: "",
        year: 0,
        rating: "G",
      },
    });
  }

  return rootStore;
}

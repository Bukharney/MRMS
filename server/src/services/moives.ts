// features/lists/lists.service.ts
import Movies, { Movie } from "../models/movies";

async function getAll() {
  return Movies.find();
}

async function get(id: string) {
  return Movies.findOne({ _id: id });
}

async function create(data: Movie) {
  return new Movies(data).save();
}

async function update(id: string, data: Movie) {
  try {
    const res = await Movies.findOneAndUpdate(
      { _id: id },
      {
        title: data.title,
        year: data.year,
        rating: data.rating,
        updatedAt: Date.now(),
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

async function remove(id: string) {
  try {
    Movies.findByIdAndDelete(id);
  } catch (err) {
    return err;
  }
}

export default { getAll, get, create, update, remove };

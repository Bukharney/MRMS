export const addMovie = async (title: string, year: number, rating: string) => {
  const res = await fetch("/api/movies/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, year, rating }),
  });
  if (res.ok) {
    return true;
  } else {
    return false;
  }
};

const updateMovie = async (
  id: string,
  title: string,
  year: number,
  rating: string
) => {
  const res = await fetch(`/api/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, year, rating }),
  });
  if (res.ok) {
    return true;
  } else {
    return false;
  }
};

const removeMovie = async (id: string) => {
  const res = await fetch(`/api/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.ok) {
    return true;
  } else {
    return false;
  }
};

export default { addMovie, updateMovie, removeMovie };

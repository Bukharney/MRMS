import { useStore } from "@/models/RootStore";
import { observer } from "mobx-react-lite";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { ChangeDialog } from "./changeDialog";
import { useToast } from "./ui/use-toast";
import { Instance } from "mobx-state-tree";
import { MovieModel } from "@/models/MovieModel";

export const MoviesTable = observer(() => {
  const { toast } = useToast();
  const rootStore = useStore();

  const handleMovieUpdate = (
    title: string,
    year: string,
    rating: string,
    movie: Instance<typeof MovieModel>
  ) => {
    rootStore.movie
      .updateMovie(movie._id, title, parseInt(year), rating)
      .then((res) => {
        if (res) {
          rootStore.updateMovie(movie._id, title, parseInt(year), rating);
          toast({
            title: "Record Updated",
            description: `The record ${title} has been updated successfully.`,
          });
        }
      });
  };

  const handleMovieDelete = (movie: Instance<typeof MovieModel>) => {
    rootStore.movie.removeMovie(movie._id).then((res) => {
      if (res) {
        toast({
          title: "Record Deleted",
          description: `The record ${movie.title} has been deleted successfully.`,
        });
        rootStore.removeMovie(movie._id);
      }
    });
  };

  rootStore.calculateTotalPages(rootStore.table.limit);

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-5/12">Title</TableHead>
          <TableHead className="text-center w-3/12">Year</TableHead>
          <TableHead className="text-center w-3/12">Rating</TableHead>
          <TableHead className="text-center w-1/12">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rootStore
          .getMoviesByPage(
            rootStore.table.currentPage,
            rootStore.table.limit,
            rootStore.searchMovie(
              rootStore.table.searchTitle,
              rootStore.table.searchYear,
              rootStore.table.searchRating
            )
          )
          .map((movie) => (
            <TableRow key={movie._id}>
              <TableCell className="font-medium w-1/12">
                {movie.title}
              </TableCell>
              <TableCell className="text-center w-3/12">{movie.year}</TableCell>
              <TableCell className="text-center w-3/12">
                {movie.rating}
              </TableCell>
              <TableCell className="text-center w-1/12">
                <ChangeDialog
                  role={rootStore.user.role}
                  button="Edit"
                  type="edit"
                  title={movie.title}
                  year={movie.year.toString()}
                  rating={movie.rating}
                  onDelete={() => {
                    handleMovieDelete(movie);
                  }}
                  onClick={(title, year, rating) => {
                    handleMovieUpdate(title, year, rating, movie);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            <Button
              onClick={rootStore.prevPage}
              disabled={rootStore.table.currentPage === 1}
            >
              Previous
            </Button>
            <span className="px-4 py-2">
              Page {rootStore.table.currentPage} of {rootStore.table.totalPages}
            </span>
            <Button
              onClick={rootStore.nextPage}
              disabled={
                rootStore.table.currentPage === rootStore.table.totalPages
              }
            >
              Next
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
});

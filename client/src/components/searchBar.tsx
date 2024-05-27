import { observer } from "mobx-react-lite";
import { ChangeDialog } from "./changeDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { useStore } from "@/models/RootStore";
import { SelectRating } from "./selectRating";

export const SearchBar = observer(() => {
  const rootStore = useStore();

  const handleMovieAdd = async (
    title: string,
    year: string,
    rating: string
  ) => {
    const res = await rootStore.movie.addMovie(title, parseInt(year), rating);
    if (res) {
      rootStore.addMovie(title, parseInt(year), rating);
      toast({
        title: "Record Added",
        description: `The record ${title} has been added successfully.`,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between p-4 items-center border-b-2">
        <div className="text-md ">
          <h1 className="px-4 text-2xl font-bold mx-4">Movies</h1>
          <p className="px-4 text-sm text-gray-500 mx-4">
            Total records: {rootStore.movies.length}
          </p>
        </div>
        <ChangeDialog
          role={rootStore.user.role}
          type="add"
          onClick={async (title: string, year: string, rating: string) => {
            handleMovieAdd(title, year, rating);
          }}
          title={""}
          year={""}
          rating={""}
        />
      </div>
      <div className="flex justify-between p-4 items-center border-b-2  gap-2">
        <Input
          placeholder="Search by title"
          value={rootStore.table.searchTitle}
          onChange={(e) => {
            rootStore.updateSearchTitle(e.target.value);
          }}
        />
        <Input
          placeholder="Search by year"
          type="number"
          value={
            rootStore.table.searchYear === 0 ? "" : rootStore.table.searchYear
          }
          onChange={(e) => {
            console.log(parseInt(e.target.value));
            rootStore.updateSearchYear(parseInt(e.target.value));
          }}
        />
        <SelectRating
          value={rootStore.table.searchRating}
          onChange={(e) => {
            rootStore.updateSearchRating(e);
          }}
        />

        <Button
          onClick={() => {
            rootStore.updateSearchYear(0);
            rootStore.updateSearchTitle("");
            rootStore.updateSearchRating("");
          }}
        >
          Clear
        </Button>
        <Button
          onClick={rootStore.nextPage}
          disabled={rootStore.table.currentPage === rootStore.table.totalPages}
        >
          Next
        </Button>

        <Button
          onClick={rootStore.prevPage}
          disabled={rootStore.table.currentPage === 1}
        >
          Previous
        </Button>

        <h1 className=" text-nowrap ">
          Page {rootStore.table.currentPage} of {rootStore.table.totalPages}
        </h1>
      </div>
    </>
  );
});

export default SearchBar;

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectRating } from "@/components/selectRating";
import { useState } from "react";

type ChangeDialogProps = {
  role: string;
  type: "add" | "edit";
  title: string;
  year: string;
  rating: string;
  onClick: (title: string, year: string, rating: string) => void;
  onDelete?: () => void;
};

export const ChangeDialog = (props: ChangeDialogProps) => {
  const [title, setTitle] = useState(props.title);
  const [year, setYear] = useState(props.year);
  const [rating, setRating] = useState(props.rating);
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-md">
          {props.type === "add" ? "Add Record" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[950px]">
        <DialogHeader>
          <DialogTitle>
            {props.type === "add" ? "Add Record" : "Edit Record"}
          </DialogTitle>
          <DialogDescription>
            {props.type === "add"
              ? "Add a new record to your movie list."
              : "Edit an existing record in your movie list."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-11"
              placeholder="e.g. The Shawshank Redemption"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              className="col-span-11"
              type="number"
              placeholder="e.g. 1994"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Rating
            </Label>
            <SelectRating
              value={rating}
              onChange={(e) => {
                setRating(e);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <div
            className={
              props.role === "manager" && props.type === "edit"
                ? "flex justify-between w-full "
                : ""
            }
          >
            {props.role === "manager" && props.type === "edit" && (
              <Button
                variant={"destructive"}
                onClick={() => {
                  if (props.onDelete) {
                    props.onDelete();
                  }
                }}
              >
                Delete
              </Button>
            )}
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={async () => {
                  props.onClick(title, year, rating);
                  setRating("");
                  setTitle("");
                  setYear("");
                }}
              >
                {props.type === "add" ? "Add Record" : "Save Changes"}
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

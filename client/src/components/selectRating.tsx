import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectRatingProps = {
  value: string;
  onChange: (e: string) => void;
};

export function SelectRating(props: SelectRatingProps) {
  return (
    <Select onValueChange={(e) => props.onChange(e)} value={props.value}>
      <SelectTrigger className=" col-span-11">
        <SelectValue placeholder="Select a rating" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ratings</SelectLabel>
          <SelectItem value="G">G</SelectItem>
          <SelectItem value="PG">PG</SelectItem>
          <SelectItem value="M">M</SelectItem>
          <SelectItem value="MA">MA</SelectItem>
          <SelectItem value="R">R</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

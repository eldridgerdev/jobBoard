import { TextField } from "@mui/material";
import Form from "next/form";
const SearchForm = () => {
  return (
    <Form action="/jobs">
      <TextField
        name="query"
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "#f4f4f4",
            borderRadius: "7px",
          },
          "& .MuiInputLabel-filled": {},
        }}
        id="search"
        variant="filled"
        label="Search"
        color="primary"
      />
    </Form>
  );
};

export default function SearchPage() {
  return (
    <div>
      <h1>This is the search page</h1>
      <SearchForm />
    </div>
  );
}

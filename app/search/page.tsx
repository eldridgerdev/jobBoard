import { TextField } from "@mui/material";
import Form from "next/form";
import Hero from "../components/Hero";

const SearchForm = () => {
  return (
    <>
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
    </>
  );
};

export default function SearchPage() {
  return (
    <div>
      <Hero />
      <h1>Search For Jobs</h1>
      <SearchForm />
    </div>
  );
}

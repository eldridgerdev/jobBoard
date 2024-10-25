import { Grid2 } from "@mui/material";
import JobCard from "./JobCard";

export default function JobCardList({ jobs }) {
  return (
    <Grid2 container spacing={2}>
      {jobs.map((job) => (
        <Grid2 sx={{ width: 1 }} key={job.id}>
          <JobCard job={job} />
        </Grid2>
      ))}
    </Grid2>
  );
}

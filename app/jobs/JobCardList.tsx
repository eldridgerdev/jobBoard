"use client";
import { Grid2 } from "@mui/material";
import { Job } from "./types";
import JobCard from "./JobCard";

export default function JobCardList({ jobs }: { jobs: Job[] | [] }) {
  return (
    <Grid2 container spacing={2}>
      {jobs.map((job) => (
        <Grid2 sx={{ width: 1 }} key={job.id}>
          <JobCard job={job} skipAi />
        </Grid2>
      ))}
    </Grid2>
  );
}

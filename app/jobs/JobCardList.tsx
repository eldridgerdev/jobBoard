"use client";
import { Grid2 } from "@mui/material";
import { Job } from "./types";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";

export default function JobCardList({ jobs }: { jobs: Job[] }) {
  const [hydrated, setHydrated] = useState(false);

  // useEffect is called after hydration,
  //   use this to render JobCards after SSR hydration because they are dynamic
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
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

import * as motion from "framer-motion/client";
import { Grid2 } from "@mui/material";
import { Job } from "./types";
import JobCard from "./JobCard";

export default function JobCardList({ jobs }: { jobs: Job[] | [] }) {
  return (
    <Grid2 container spacing={2}>
      {jobs.map((job, i) => (
        <Grid2 sx={{ width: 1 }} key={job.id}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.05 * i }}
          >
            <JobCard job={job} skipAi />
          </motion.div>
        </Grid2>
      ))}
    </Grid2>
  );
}

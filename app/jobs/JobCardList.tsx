"use client";
import * as motion from "framer-motion/client";
import { Grid2 } from "@mui/material";
import { Job } from "./types";
import JobCard from "./JobCard";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function JobCardList({ jobs }: { jobs: Job[] | [] }) {
  const [jobsList, setJobs] = useState(jobs);
  return (
    <Grid2 container spacing={2}>
      <AnimatePresence>
        {jobsList.map((job, i) => (
          <Grid2 sx={{ width: 1 }} key={job.id}>
            <motion.div
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: "0.6", delay: 0.05 * i }}
              exit={{
                transition: {
                  type: "just",
                  ease: "easeIn",
                  delay: 0,
                },
                x: 2000,
              }}
            >
              <JobCard
                job={job}
                onSpecialClick={() => {
                  setJobs(jobsList.filter((j, ji) => ji !== i));
                }}
              />
            </motion.div>
          </Grid2>
        ))}
      </AnimatePresence>
    </Grid2>
  );
}

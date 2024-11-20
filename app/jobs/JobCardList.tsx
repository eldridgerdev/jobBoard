"use client";
import * as motion from "framer-motion/client";
import { Grid2 } from "@mui/material";
import { Job } from "./types";
import JobCard from "./JobCard";
import { PropsWithChildren, useState } from "react";
import { AnimatePresence, HTMLMotionProps } from "framer-motion";

type JobProps = PropsWithChildren & {
  delayIndex: number;
};
const JobDiv = ({ children, delayIndex }: JobProps) => (
  <motion.div
    layout
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", bounce: "0.6", delay: 0.05 * delayIndex }}
  >
    {children}
  </motion.div>
);

// @TODO: Clean this up to reduce repeated code, though this will likely change enough to not be worth the effort
const SpecialJob = ({ children, delayIndex }: JobProps) => (
  <motion.div
    layout
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", bounce: "0.6", delay: 0.05 * delayIndex }}
    whileHover={{
      transition: {
        type: "spring",
        bounce: "0.2",
        delay: 0,
      },
      x: 100,
    }}
    exit={{
      transition: {
        type: "just",
        ease: "easeIn",
        delay: 0,
      },
      x: 2000,
    }}
  >
    {children}
  </motion.div>
);

const WhichJob = ({
  children,
  special,
  delayIndex,
}: JobProps & { special?: boolean }) => {
  return special ? (
    <SpecialJob delayIndex={delayIndex}>{children}</SpecialJob>
  ) : (
    <JobDiv delayIndex={delayIndex}>{children}</JobDiv>
  );
};

export default function JobCardList({ jobs }: { jobs: Job[] | [] }) {
  const [jobsList, setJobs] = useState(jobs);
  return (
    <Grid2 container spacing={2}>
      <AnimatePresence>
        {jobsList.map((job, i) => (
          <Grid2 sx={{ width: 1 }} key={job.id}>
            <WhichJob special={job.special} delayIndex={i}>
              <JobCard
                job={job}
                onSpecialClick={() => {
                  setJobs(jobsList.filter((j, ji) => ji !== i));
                }}
              />
            </WhichJob>
          </Grid2>
        ))}
      </AnimatePresence>
    </Grid2>
  );
}

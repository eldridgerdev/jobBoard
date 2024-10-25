import { useAPI } from "./getAPI";
const JOBS_API_HOST = "jobs-api14.p.rapidapi.com";
const JOBS_API = `${JOBS_API_HOST}/list`;

const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;
const OPENAPI_KEY = process.env.NEXT_PUBLIC_OPEN_API_KEY;

const opts = {
  method: "GET",
  url: `https://${JOBS_API}`,
  params: {
    query: "Web Developer",
    location: "United States",
    distance: "1.0",
    language: "en_US",
    remoteOnly: "true",
    datePosted: "day",
    employmentTypes: "fulltime;parttime;contractor",
    index: "0",
  },
  headers: {
    "x-rapidapi-host": JOBS_API_HOST,
    "x-rapidapi-key": API_KEY,
  },
};

type Job = {
  id: string;
  company: string;
  description: string;
  title: string;
  jobProviders: [
    {
      jobProivider: string;
      url: string;
    },
  ];
};
type Jobs = Job[];
type JobData = {
  jobs: Jobs;
  isLoading: boolean;
  error: Error | null;
};

export const useJobData = (): JobData => {
  const { data, isLoading, error } = useAPI(JOBS_API_HOST, JOBS_API, opts);
  return {
    jobs: !data
      ? []
      : data.jobs.map((job) => ({
          company: job.company,
          title: job.title,
          id: job.id,
          description: job.description,
          jobProviders: job.jobProviders,
        })),
    isLoading,
    error,
  };
};

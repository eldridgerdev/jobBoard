import { useAPI } from "./getAPI";
const JOBS_API_HOST = "jobs-api14.p.rapidapi.com";
// const JOBS_API_HOST = "fresh-linkedin-profile-data.p.rapidapi.com";
const JOBS_API = `${JOBS_API_HOST}`;

const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

const opts = {
  method: "GET",
  url: `https://${JOBS_API}`,
  data: {
    keywords: "Web Developer",
    location: "United States",
    distance: 1,
  },
  headers: {
    "x-rapidapi-host": JOBS_API_HOST,
    "x-rapidapi-key": API_KEY,
  },
};

interface Job {
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
}
interface JobData {
  jobs: Job[];
  isLoading: boolean;
  error: Error | null;
}

export const useJobData = (): JobData => {
  const query = `query=${opts.data.keywords}`;
  const location = `&location=${opts.data.location}`;
  const distance = `&distance=${opts.data.distance}`;
  const language = `&language=en_US`;
  const remote = `&remote`;

  const url = `https://${JOBS_API}/list?${query}${location}${distance}${language}${remote}`;
  const { data, isLoading, error } = useAPI(url, {
    method: "GET",
    headers: opts.headers,
  });
  console.log(data);
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

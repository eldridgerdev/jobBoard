import { Job } from "../jobs/types";

const JOBS_API_HOST = "jobs-api14.p.rapidapi.com";
const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

/** https://rapidapi.com/Pat92/api/jobs-api14/playground/apiendpoint_90c56edf-c5a6-45d6-b5a9-686ad050a25a */
interface JobsApiOptions {
  /** Required Keywords, Jobtitle, Company name or any other relevant search-query. */
  query: string;
  /** Required City, country, or any other locations. */
  location: string;
  /** Optional Default value = -1.0 Distance to the location in kilometers */
  distance: number;
}

export const testData: Job[] = new Array(5)
  .fill(undefined)
  .map((job: Job, i): Job => {
    return {
      id: `${i}`,
      title: "Title",
      description: "Test Description",
      company: "Test Company",
      jobProviders: [
        {
          jobProvider: "test",
          url: "/",
        },
      ],
    };
  });

const data: JobsApiOptions = {
  query: "Web Developer",
  location: "United States",
  distance: 1,
};

const defaultOpts = {
  method: "GET",
  url: `https://${JOBS_API_HOST}`,
  data,
  headers: {
    "x-rapidapi-host": JOBS_API_HOST,
    "x-rapidapi-key": API_KEY,
  },
};

interface GetJobsOpts {
  method?: string;
  url?: string;
  headers?: HeadersInit;
  data: {
    query?: string;
    location?: string;
    distance?: number;
  };
}
const empty = { data: {} };
export async function getJobs(jobOpts: GetJobsOpts = empty): Promise<Job[]> {
  // For testing
  const options = {
    ...defaultOpts,
    ...jobOpts,
    data: {
      ...defaultOpts.data,
      ...jobOpts.data,
    },
  };
  const query = `query=${options.data.query}`;
  const location = `&location=${options.data.location}`;
  const distance = `&distance=${options.data.distance}`;
  const language = `&language=en_US`;
  const remote = `&remote`;
  const url = `https://${JOBS_API_HOST}/v2/list?${query}${location}${distance}${language}${remote}`;
  const response = await fetch(url, {
    method: "GET",
    headers: options.headers as HeadersInit,
  });
  const data = await response.json();
  if (data.jobs.length === 0) {
    // @TODO: do some real stuff later, toss in some test data for now because the API isn't working
    data.jobs = testData;
    console.log(data.jobs);
  }
  return data.jobs;
}

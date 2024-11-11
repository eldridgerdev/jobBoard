import { Job } from "../jobs/types";

const JOBS_API_HOST = "jobs-api14.p.rapidapi.com";
const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

const opts = {
  method: "GET",
  url: `https://${JOBS_API_HOST}`,
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

const query = `query=${opts.data.keywords}`;
const location = `&location=${opts.data.location}`;
const distance = `&distance=${opts.data.distance}`;
const language = `&language=en_US`;
const remote = `&remote`;

export async function getJobs(): Promise<Job[]> {
  const url = `https://${JOBS_API_HOST}/list?${query}${location}${distance}${language}${remote}`;
  const response = await fetch(url, {
    method: "GET",
    headers: opts.headers as HeadersInit,
  });
  const data = await response.json();
  return data.jobs;
}

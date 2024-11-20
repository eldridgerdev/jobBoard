import JobCardList from "./JobCardList";
import { getAIResponse } from "../services/getAiResponse";
import { getJobs, testData } from "../services/getJobs";
import { Job } from "./types";
import Hero from "../components/Hero";
import hiddenJob from "./hiddenJob";

type PageParams = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};
export default async function JobPostingsPage({ searchParams }: PageParams) {
  const params = await searchParams;
  const opts = params.query ? { data: { query: params.query } } : undefined;
  // @TODO: Cant't seem to get the AI to give me proper json.
  const getAIJobs = async () => {
    const jobs = await getAIResponse(
      `Provide only valid JSON output without any other text. Give me 10 example jobs for a Web Developer. Follow this JSON example exactly: ${JSON.stringify(testData)}`,
      "Provide valid JSON output that I can parse in my program",
    );
    console.log(jobs);
    return JSON.parse(jobs);
  };
  const jobs = (await getJobs(opts)) || /* (await getAIJobs()) ||*/ [];

  // @TODO: Make less Groq calls by updating the description later
  //   - Make Jobs a side menu or different route instead of expanded card.
  //     - This should make more sense when doing a Groq AI call only for the needed desc.
  const updatedJobs = await Promise.all(
    jobs.map(async (job: Job): Promise<Job> => {
      const newDesc = job.description; // await getAIResponse(job.description);
      return {
        ...job,
        description: newDesc,
      };
    }),
  ).catch((err) => {
    // @TODO: Throw error to display an error page instead
    console.error(err);
    return [];
  });

  // Put hidden job in randomly
  const hiddenJobI = Math.round(Math.random() * updatedJobs.length);
  const j = [
    ...updatedJobs.slice(0, hiddenJobI),
    hiddenJob,
    ...updatedJobs.slice(hiddenJobI),
  ];

  return (
    <>
      <Hero />
      {j.length > 0 ? <JobCardList jobs={j} /> : <div>No Jobs found</div>}
    </>
  );
}

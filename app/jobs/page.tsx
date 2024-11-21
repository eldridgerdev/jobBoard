import JobCardList from "./JobCardList";
import { getAIResponse } from "../services/getAiResponse";
import { getJobs } from "../services/getJobs";
import Hero from "../components/Hero";

type PageParams = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};
export default async function JobPostingsPage({ searchParams }: PageParams) {
  const params = await searchParams;
  const opts = params.query ? { data: { query: params.query } } : undefined;
  const jobs = await getJobs(opts);

  // @TODO: Make less Groq calls by updating the description later
  //   - Make Jobs a side menu or different route instead of expanded card.
  //     - This should make more sense when doing a Groq AI call only for the needed desc.
  const updatedJobs = await Promise.all(
    jobs.map(async (job) => {
      // const newDesc = await getAIResponse(job.description);
      const newDesc = "debugging";
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
  return (
    <>
      <Hero />
      <h1>JobPostingsPage</h1>
      <JobCardList jobs={updatedJobs} />
    </>
  );
}

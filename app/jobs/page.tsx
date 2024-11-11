import Hero from "../other/Hero";
import JobCardList from "../other/JobCardList";
import { getAIResponse } from "../services/getAiResponse";
import { getJobs } from "../services/getJobs";

export default async function JobPostingsPage() {
  const jobs = await getJobs();

  // @TODO: Make less Groq calls by updating the description later
  //   - Make Jobs a side menu or different route instead of expanded card.
  //     - This should make more sense when doing a Groq AI call only for the needed desc.
  const updatedJobs = await Promise.all(
    jobs.map(async (job) => {
      const newDesc = await getAIResponse(job.description);
      return {
        ...job,
        description: newDesc,
      };
    }),
  );
  return (
    <>
      {// <Hero></Hero> }
      <h1>JobPostingsPage</h1>
      <JobCardList jobs={updatedJobs} />
    </>
  );
}

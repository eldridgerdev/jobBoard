import JobCardList from "./JobCardList";
import { getAIResponse } from "../services/getAiResponse";
import { getJobs } from "../services/getJobs";

type PageParams = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};
export default async function JobPostingsPage({ searchParams }: PageParams) {
  const params = await searchParams;
  const jobs = await getJobs({
    data: {
      query: params.query,
    },
  });

  // @TODO: Make less Groq calls by updating the description later
  //   - Make Jobs a side menu or different route instead of expanded card.
  //     - This should make more sense when doing a Groq AI call only for the needed desc.
  const updatedJobs = await Promise.all(
    jobs.map(async (job) => {
      const newDesc = await getAIResponse(job.description);
      // const newDesc = "debugging";
      return {
        ...job,
        description: newDesc,
      };
    }),
  ).catch((err) => {
    // @TODO: Maybe throw error to display an error page instead
    console.error(err);
    return [];
  });
  return (
    <>
      <h1>JobPostingsPage</h1>
      <JobCardList jobs={updatedJobs} />
    </>
  );
}

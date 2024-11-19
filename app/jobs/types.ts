export interface Job {
  id: string;
  company: string;
  description: string;
  title: string;
  jobProviders:
    | []
    | [
        {
          jobProvider: string;
          url: string;
        },
      ];
}
export interface JobData {
  jobs: Job[];
  isLoading: boolean;
  error: Error | null;
}

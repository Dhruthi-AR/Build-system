export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export interface StatusUpdate {
    jobId: string;
    jobTitle: string;
    company: string;
    status: JobStatus;
    timestamp: string; // ISO date
}

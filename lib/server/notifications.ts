import type { ContactMethod, TutorStatus } from './models';

type StatusNotificationJob = {
  id: number;
  tutorId: number;
  tutorPhone: string;
  tutorEmail: string;
  preferredMethod: ContactMethod;
  status: TutorStatus;
  attempts: number;
  createdAt: string;
};

let nextJobId = 1;
const queue: StatusNotificationJob[] = [];
const delivered: StatusNotificationJob[] = [];

function deliver(_job: StatusNotificationJob): boolean {
  // Simulate transient failures so the queue retries and maintains at-least-once behavior.
  const transientFailure = Math.random() < 0.2;
  return !transientFailure;
}

export function enqueueStatusNotification(
  job: Omit<StatusNotificationJob, 'id' | 'attempts' | 'createdAt'>,
): number {
  const id = nextJobId++;
  queue.push({
    id,
    attempts: 0,
    createdAt: new Date().toISOString(),
    ...job,
  });
  return id;
}

export function processNotificationQueueOnce(): void {
  if (queue.length === 0) {
    return;
  }

  const batch = queue.splice(0, queue.length);
  for (const job of batch) {
    const nextAttempt = job.attempts + 1;
    const succeeded = deliver(job);

    if (succeeded) {
      delivered.push({ ...job, attempts: nextAttempt });
      continue;
    }

    if (nextAttempt < 5) {
      queue.push({ ...job, attempts: nextAttempt });
    }
  }
}

export function getNotificationStats(): { queued: number; delivered: number } {
  return {
    queued: queue.length,
    delivered: delivered.length,
  };
}

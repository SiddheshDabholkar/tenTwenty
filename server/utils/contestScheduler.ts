import cron from "node-cron";
import { Contest } from "../models/Contest";
import { Submission } from "../models/Submission";
import { Wonby } from "../models/WonBy";

const handleContestEnd = async (contestId: string) => {
  try {
    console.log(`Contest ${contestId} has ended. Processing results...`);
    const contest = await Contest.findById(contestId);
    if (!contest) {
      console.error(`Contest ${contestId} not found`);
      return;
    }
    if (contest.wonBy) {
      console.log(`Contest ${contestId} already has a winner`);
      return;
    }
    const submissions = await Submission.find({ contestId })
      .sort({ score: -1, timeTaken: 1 })
      .limit(1);

    if (submissions.length === 0) {
      console.log(`No submissions found for contest ${contestId}`);
      return;
    }

    const winningSubmission = submissions[0];

    const wonByRecord = await Wonby.create({
      contestId: contest._id,
      userId: winningSubmission.userId,
      submissionId: winningSubmission._id,
    });

    await Contest.findByIdAndUpdate(contestId, {
      wonBy: wonByRecord._id,
    });

    console.log(
      `Winner determined for contest ${contestId}: User ${winningSubmission.userId}`
    );
  } catch (error) {
    console.error(`Error handling contest end for ${contestId}:`, error);
  }
};

const checkEndedContests = async () => {
  try {
    const now = new Date();
    const endedContests = await Contest.find({
      endDateTime: { $lte: now },
      wonBy: null,
    });

    if (endedContests.length > 0) {
      console.log(`Found ${endedContests.length} ended contest(s) to process`);

      for (const contest of endedContests) {
        await handleContestEnd(contest._id.toString());
      }
    }
  } catch (error) {
    console.error("Error checking ended contests:", error);
  }
};

export const initContestScheduler = () => {
  cron.schedule("* * * * *", async () => {
    await checkEndedContests();
  });
  console.log("Contest scheduler initialized - checking every minute");
};

export { handleContestEnd, checkEndedContests };

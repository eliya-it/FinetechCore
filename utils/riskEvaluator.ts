import { prisma } from "../prisma";

export const evaluateRisk = async ({
  userId,
  transactionId,
  amount,
}: {
  userId: string;
  transactionId: string;
  amount: number;
}) => {
  const rules = await prisma.riskRule.findMany({
    where: { enabled: true },
  });

  const matchedLogs: {
    userId: string;
    transactionId: string;
    ruleName: string;
    reason: string;
  }[] = [];

  const now = new Date();
  const hour = now.getHours();

  for (const rule of rules) {
    const config = rule.config as any;
    if (rule.type === "AMOUNT_THRESHOLD") {
      if (amount >= config.amount) {
        matchedLogs.push({
          userId,
          transactionId,
          ruleName: rule.name,
          reason: `Amount exceeds threshold: ${amount} of ${config.amount}`,
        });
      }
    }
    if (rule.type === "TIME_WINDOW") {
      const start = parseInt(config.start.split(":")[0]); // Start hour of the time window
      const end = parseInt(config.end.split(":")[0]); // End hour of the time window
      const isNight =
        (start > end && (hour >= start || hour < end)) ||
        (hour >= start && hour < end);
      if (isNight) {
        matchedLogs.push({
          userId,
          transactionId,
          ruleName: rule.name,
          reason: `Transfer made during restricted time (${hour}:00)`,
        });
      }
    }
  }
  if (matchedLogs.length > 0) {
    await prisma.riskLog.createMany({
      data: matchedLogs,
    });
  }
  return matchedLogs;
};

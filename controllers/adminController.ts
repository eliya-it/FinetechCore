import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getRiskLogs = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const riskLogs = await prisma.riskLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  res.json({
    status: "success",
    riskLogs,
  });
};

export const getMetrics = async (req: Request, res: Response) => {
  const totalUsers = await prisma.user.count();
  const totalTransactions = await prisma.transaction.count();
  const totalRiskLogs = await prisma.riskLog.count();

  res.json({
    status: "success",
    metrics: {
      totalUsers,
      totalTransactions,
      totalRiskLogs,
    },
  });
};
export const getWalletsBalances = async (req: Request, res: Response) => {
  const wallets = await prisma.wallet.findMany({
    include: {
      user: true,
    },
  });

  const balances = wallets.map((wallet) => ({
    userId: wallet.userId,
    balance: wallet.balance,
    userName: wallet.user.name,
  }));

  res.json({
    status: "success",
    balances,
  });
};

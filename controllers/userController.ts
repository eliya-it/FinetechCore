import { prisma } from "../prisma";
import { Request, Response } from "express";

export const getMyWallet = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    return res.status(404).json({ error: "Wallet not found" });
  }
  res.json({
    status: "success",
    wallet,
  });
};

export const getTransactions = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const transactions = await prisma.transaction.findMany({
    where: { fromUser: userId },
    orderBy: { createdAt: "desc" },
  });

  res.json({
    status: "success",
    transactions,
  });
};
export const getLedgerEntries = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const ledgerEntries = await prisma.ledgerEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  res.json({
    status: "success",
    ledgerEntries,
  });
};

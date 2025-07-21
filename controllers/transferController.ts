import { Request, Response } from "express";
import { prisma } from "../prisma"; // your Prisma client
import { v4 as uuidv4 } from "uuid";
import { evaluateRisk } from "../utils/riskEvaluator";

export const transferMoney = async (req: Request, res: Response) => {
  const { toUserEmail, amount } = req.body;
  const fromUser = req.user.id;

  if (!fromUser || !toUserEmail || !amount) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const amountValue = parseFloat(amount);

  if (amountValue <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const fromWallet = await prisma.wallet.findUnique({
    where: { userId: fromUser },
  });

  const toUser = await prisma.user.findUnique({
    where: { email: toUserEmail },
  });

  if (!fromWallet || !toUser)
    return res.status(404).json({ error: "Wallet or user not found" });

  if (fromUser === toUser.id)
    return res.status(400).json({ error: "Cannot transfer to self" });

  const toWallet = await prisma.wallet.findUnique({
    where: { userId: toUser.id },
  });

  if (!toWallet)
    return res.status(404).json({ error: "Recipient wallet not found" });

  if (Number(fromWallet.balance) < amountValue) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const txId = uuidv4();

  // Begin transfer
  try {
    await prisma.$transaction([
      // Deduct sender
      prisma.wallet.update({
        where: { userId: fromUser },
        data: { balance: { decrement: amountValue } },
      }),

      // Credit receiver
      prisma.wallet.update({
        where: { userId: toUser.id },
        data: { balance: { increment: amountValue } },
      }),

      // Save transaction record
      prisma.transaction.create({
        data: {
          id: txId,
          fromUser: fromUser,
          toUser: toUser.id,
          amount: amountValue,
          status: "completed",
        },
      }),

      // Ledger entries
      prisma.ledgerEntry.createMany({
        data: [
          {
            userId: fromUser,
            transactionId: txId,
            type: "DEBIT",
            amount: amountValue,
            source: `wallet:${fromUser}`,
            destination: `wallet:${toUserEmail}`,
          },
          {
            userId: toUserEmail,
            transactionId: txId,
            type: "CREDIT",
            amount: amountValue,
            source: `wallet:${fromUser}`,
            destination: `wallet:${toUserEmail}`,
          },
        ],
      }),
    ]);
    await evaluateRisk({
      userId: fromUser,
      transactionId: txId,
      amount: amountValue,
    });
    console.log(
      await evaluateRisk({
        userId: fromUser,
        transactionId: txId,
        amount: amountValue,
      })
    );

    return res.status(200).json({
      success: true,
      transactionId: txId,
      from: fromUser,
      to: toUser.id,
      amount: amountValue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Transfer failed" });
  }
};

export const getTransferHistory = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [{ fromUser: userId }, { toUser: userId }],
    },
    orderBy: { createdAt: "desc" },
  });

  res.json({
    status: "success",
    transactions,
  });
};

import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.riskRule.createMany({
    data: [
      {
        name: "Large Transfer",
        type: "AMOUNT_THRESHOLD",
        config: { amount: 100000 },
      },
      {
        name: "Night Transfer",
        type: "TIME_WINDOW",
        config: { start: "22:00", end: "06:00" },
      },
    ],
  });

  console.log("Seeded risk rules");
}
main();

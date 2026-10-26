import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TransactionType } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const movements: {
  counterparty: string;
  type: TransactionType;
  amount: number;
  daysAgo: number;
  description?: string;
}[] = [
  { counterparty: "Adobe", type: "SUBSCRIPTION", amount: 125, daysAgo: 0, description: "Creative Cloud - plan mensual" },
  { counterparty: "José Suárez", type: "CASH_IN", amount: 95, daysAgo: 1, description: "Entradas para el partido" },
  { counterparty: "Figma", type: "SUBSCRIPTION", amount: 125, daysAgo: 2, description: "Plan Professional" },
  { counterparty: "Juan Rodríguez", type: "CASH_OUT", amount: 95, daysAgo: 3, description: "Cuota del fútbol 5" },
  { counterparty: "Julio César", type: "CASH_IN", amount: 95, daysAgo: 4 },
  { counterparty: "Mariano Martínez", type: "CASH_OUT", amount: 60, daysAgo: 5, description: "Asado del domingo" },
  { counterparty: "Spotify", type: "SUBSCRIPTION", amount: 11.99, daysAgo: 7, description: "Premium Familiar" },
  { counterparty: "Ronaldo", type: "CASH_IN", amount: 95, daysAgo: 8 },
  { counterparty: "Juan Perez", type: "CASH_OUT", amount: 95, daysAgo: 9, description: "Devolución préstamo" },
  { counterparty: "Netflix", type: "SUBSCRIPTION", amount: 15.49, daysAgo: 11, description: "Plan Estándar" },
  { counterparty: "Juan Cabrera", type: "CASH_IN", amount: 95, daysAgo: 12 },
  { counterparty: "Jorge Álvarez", type: "CASH_OUT", amount: 95, daysAgo: 14, description: "Camiseta oficial" },
  { counterparty: "Club Atlético Lanús", type: "SUBSCRIPTION", amount: 30, daysAgo: 16, description: "Cuota social" },
  { counterparty: "Lucía Gómez", type: "CASH_IN", amount: 240.5, daysAgo: 18, description: "Viaje a Mar del Plata" },
  { counterparty: "Diego Fernández", type: "CASH_OUT", amount: 42, daysAgo: 21 },
  { counterparty: "Google One", type: "SUBSCRIPTION", amount: 1.99, daysAgo: 24, description: "100 GB de almacenamiento" },
];

async function main() {
  const email = "soygranate@clublanus.com";
  const passwordHash = await bcrypt.hash("GRANATE1@", 10);

  // El seed es idempotente: mantenemos al usuario (así no se invalidan las
  // sesiones abiertas) y recreamos sus tarjetas y movimientos.
  const { id: userId } = await prisma.user.upsert({
    where: { email },
    update: { name: "Granate", passwordHash },
    create: { email, name: "Granate", passwordHash },
  });

  await prisma.transaction.deleteMany({ where: { userId } });
  await prisma.card.deleteMany({ where: { userId } });

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      cards: {
        create: [
          { brand: "MASTERCARD", holderName: "Soy Granate", lastFour: "1234", expMonth: 2, expYear: 2030, balance: 978.85 },
          { brand: "VISA", holderName: "Soy Granate", lastFour: "5678", expMonth: 9, expYear: 2028, balance: 2310.4 },
        ],
      },
    },
    include: { cards: { orderBy: { createdAt: "asc" } } },
  });

  const [mainCard] = user.cards;

  await prisma.transaction.createMany({
    data: movements.map((movement, index) => ({
      userId: user.id,
      cardId: mainCard.id,
      type: movement.type,
      counterparty: movement.counterparty,
      description: movement.description,
      amount: movement.amount,
      // Restamos unas horas extra para que no queden todos a la misma hora.
      date: new Date(Date.now() - movement.daysAgo * DAY - (index % 6) * HOUR),
    })),
  });

  console.log(`Seed listo: ${user.email} con ${movements.length} movimientos`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

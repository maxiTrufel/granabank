import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";
import { jsonError, serverError, unauthorized } from "@/lib/http";
import { serializeTransaction } from "@/lib/serializers";
import { fieldErrors, transactionFiltersSchema } from "@/lib/validations";
import type { Transaction } from "@/lib/types";

export async function GET(request: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return unauthorized();

  const params = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = transactionFiltersSchema.safeParse(params);

  if (!parsed.success) {
    return jsonError(400, "Los filtros de búsqueda no son válidos", fieldErrors(parsed.error));
  }

  const { q, type, limit } = parsed.data;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type,
        // Busca por nombre de persona o servicio, sin distinguir mayúsculas.
        counterparty: q ? { contains: q, mode: "insensitive" } : undefined,
      },
      orderBy: { date: "desc" },
      take: limit,
    });

    return NextResponse.json<Transaction[]>(transactions.map(serializeTransaction));
  } catch (error) {
    return serverError(error);
  }
}

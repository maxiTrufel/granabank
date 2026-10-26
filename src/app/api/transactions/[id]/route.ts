import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";
import { jsonError, serverError, unauthorized } from "@/lib/http";
import { serializeTransaction } from "@/lib/serializers";
import type { TransactionDetail } from "@/lib/types";

export async function GET(_request: NextRequest, ctx: RouteContext<"/api/transactions/[id]">) {
  const userId = await getSessionUserId();
  if (!userId) return unauthorized();

  const { id } = await ctx.params;

  try {
    // Filtramos también por userId: un movimiento de otro usuario responde
    // 404, igual que uno que no existe.
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
      include: { card: { select: { brand: true, lastFour: true } } },
    });

    if (!transaction) {
      return jsonError(404, "No encontramos el movimiento que estás buscando");
    }

    return NextResponse.json<TransactionDetail>({
      ...serializeTransaction(transaction),
      card: transaction.card,
    });
  } catch (error) {
    return serverError(error);
  }
}

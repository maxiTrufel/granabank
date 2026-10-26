import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";
import { serverError, unauthorized } from "@/lib/http";
import { serializeCard } from "@/lib/serializers";
import type { Profile } from "@/lib/types";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return unauthorized();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { cards: { orderBy: { createdAt: "asc" } } },
    });
    if (!user) return unauthorized();

    return NextResponse.json<Profile>({
      name: user.name,
      email: user.email,
      cards: user.cards.map(serializeCard),
    });
  } catch (error) {
    return serverError(error);
  }
}

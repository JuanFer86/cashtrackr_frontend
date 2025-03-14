import { VerifySession } from "@/src/auth/dal";
import getToken from "@/src/auth/token";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ budgetId: string; expenseId: string }> }
) {
  const { budgetId, expenseId } = await params;

  await VerifySession();

  const token = await getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    return Response.json(json.message, { status: response.status });
  }

  return Response.json(json);
}

import { apiOk } from "@/lib/api";
import { clearSessionCookie } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function POST() {
  clearSessionCookie();
  return apiOk({ success: true });
}

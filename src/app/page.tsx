import { redirect } from "next/navigation";

// El proxy ya manda al login si no hay sesión.
export default function RootPage() {
  redirect("/home");
}

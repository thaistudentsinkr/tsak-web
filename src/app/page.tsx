//this file only to enforce redirection to home/th, not home/
import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect to /th
  redirect("/en");
}

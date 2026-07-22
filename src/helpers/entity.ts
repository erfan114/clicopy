import toast from "solid-toast";
import { Entry } from "./db";

export async function copyEntryText(entry: Entry) {
  await navigator.clipboard.writeText(entry.text);
  toast.success("Successfully copied to your clipboard !");
}

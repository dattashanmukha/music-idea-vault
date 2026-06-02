"use server";

import { supabase } from "../lib/supabase";
import { redirect } from "next/navigation";

export async function createIdea(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const ideaType = formData.get("ideaType") as string;

  const { error } = await supabase
    .from("ideas")
    .insert([
      {
        title,
        description,
        idea_type: ideaType,
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function deleteIdea(id: string) {
  "use server";

  const { error } = await supabase
    .from("ideas")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
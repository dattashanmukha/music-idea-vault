"use server";

import { supabase } from "../lib/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createIdea(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const ideaType = formData.get("ideaType") as string;

  const audioFile = formData.get("audio") as File;

  let audioUrl: string | null = null;

  if (audioFile && audioFile.size > 0) {
    const fileName = `${Date.now()}-${audioFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("idea-audio")
      .upload(fileName, audioFile);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("idea-audio")
      .getPublicUrl(fileName);

    audioUrl = data.publicUrl;
  }

  const { error } = await supabase
    .from("ideas")
    .insert([
      {
        title,
        description,
        idea_type: ideaType,
        audio_url: audioUrl,
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteIdea(id: string) {
  const { error } = await supabase
    .from("ideas")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}
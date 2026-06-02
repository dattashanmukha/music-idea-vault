import { supabase } from "../lib/supabase";
import Link from "next/link";
import IdeaList from "./components/IdeaList";

export default async function Home() {
  const { data: ideas, error } = await supabase
    .from("ideas")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            🎵 Music Idea Vault
          </h1>

          <Link
            href="/add"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            + Add Idea
          </Link>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
            {error.message}
          </div>
        )}

        {ideas?.length === 0 ? (
          <div className="text-gray-500">
            No ideas yet. Capture your first one.
          </div>
        ) : (
          <IdeaList ideas={ideas ?? []} />
        )}
      </div>
    </main>
  );
}
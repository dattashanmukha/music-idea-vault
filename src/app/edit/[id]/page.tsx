import { supabase } from "../../../lib/supabase";
import { updateIdea } from "../../actions";

export default async function EditIdeaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: idea } = await supabase
    .from("ideas")
    .select("*")
    .eq("id", id)
    .single();

  if (!idea) {
    return (
      <main className="p-8">
        <h1>Idea not found</h1>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Idea
      </h1>

      <form
  action={updateIdea}
  className="space-y-4"
>
        <input
          type="hidden"
          name="id"
          value={idea.id}
        />

        <input
          name="title"
          defaultValue={idea.title}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          defaultValue={idea.description}
          className="border p-2 w-full"
          rows={4}
        />

        <select
          name="ideaType"
          defaultValue={idea.idea_type}
          className="border p-2 w-full"
        >
          <option value="Melody">Melody</option>
          <option value="Lyrics">Lyrics</option>
          <option value="Flute">Flute</option>
          <option value="Rhythm">Rhythm</option>
          <option value="Chord Progression">
            Chord Progression
          </option>
          <option value="Score">Score</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
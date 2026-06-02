import { createIdea } from "../actions";

export default function AddIdeaPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Add Idea
      </h1>

      <form
        action={createIdea}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          rows={4}
        />

        <select
          name="ideaType"
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

        <div>
          <label className="block mb-2">
            Audio Recording
          </label>

          <input
            type="file"
            name="audio"
            accept="audio/*"
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Idea
        </button>
      </form>
    </main>
  );
}
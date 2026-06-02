"use client";

import { useState } from "react";
import DeleteButton from "./DeleteButton";

export default function IdeaList({ ideas }: { ideas: any[] }) {
  const [search, setSearch] = useState("");

  const filteredIdeas = ideas.filter((idea) =>
    `${idea.title} ${idea.description} ${idea.idea_type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="🔍 Search ideas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 w-full mb-6 rounded-lg"
      />

      <div className="space-y-4">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  {idea.title}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  {idea.idea_type}
                </p>
              </div>

              <DeleteButton id={idea.id} />
            </div>

            <div>
  <p>{idea.description}</p>

  {idea.audio_url && (
    <audio
      controls
      className="mt-3 w-full"
    >
      <source
        src={idea.audio_url}
      />
      Your browser does not support audio.
    </audio>
  )}

  <p className="text-xs text-gray-400 mt-3">
    {new Date(
      idea.created_at
    ).toISOString()}
  </p>
</div>
          </div>
        ))}
      </div>
    </>
  );
}
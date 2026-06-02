"use client";

import { useState } from "react";
import { createIdea } from "../actions";
import AudioRecorder from "../components/AudioRecorder";

export default function AddIdeaPage() {
  const [audioSource, setAudioSource] = useState<
    "record" | "upload"
  >("record");

  const [recordedFile, setRecordedFile] =
    useState<File | null>(null);

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

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">
            Audio Source
          </h3>

          <div className="flex gap-6 mb-4">
            <label>
              <input
                type="radio"
                checked={audioSource === "record"}
                onChange={() =>
                  setAudioSource("record")
                }
              />{" "}
              Record Audio
            </label>

            <label>
              <input
                type="radio"
                checked={audioSource === "upload"}
                onChange={() =>
                  setAudioSource("upload")
                }
              />{" "}
              Upload File
            </label>
          </div>

          {audioSource === "record" && (
            <>
              <AudioRecorder
                onRecordingComplete={(file) => {
                  setRecordedFile(file);
                }}
              />

              {recordedFile && (
                <p className="text-green-600 mt-2">
                  ✅ Recording ready to save
                </p>
              )}
            </>
          )}

          {audioSource === "upload" && (
            <input
              type="file"
              name="audio"
              accept="audio/*"
              className="border p-2 w-full"
            />
          )}
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
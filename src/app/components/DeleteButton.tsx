"use client";

import { useTransition } from "react";
import { deleteIdea } from "../actions";

export default function DeleteButton({
  id,
}: {
  id: string;
}) {
  const [isPending, startTransition] =
    useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => deleteIdea(id))
      }
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
"use client";

import { useRef, useState } from "react";

export default function AudioRecorder({
  onRecordingComplete,
}: {
  onRecordingComplete: (file: File) => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      const mediaRecorder =
        new MediaRecorder(stream);

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (
        event
      ) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(
          chunksRef.current,
          {
            type: "audio/webm",
          }
        );

        const file = new File(
          [audioBlob],
          `recording-${Date.now()}.webm`,
          {
            type: "audio/webm",
          }
        );

        onRecordingComplete(file);

        const url =
          URL.createObjectURL(audioBlob);

        setAudioUrl(url);

        stream
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      };

      mediaRecorder.start();

      mediaRecorderRef.current =
        mediaRecorder;

      setIsRecording(true);
    } catch (error) {
      console.error(
        "Microphone access denied",
        error
      );
      alert(
        "Please allow microphone access."
      );
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-semibold mb-3">
        Voice Recording
      </h3>

      {!isRecording ? (
        <button
          type="button"
          onClick={startRecording}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          🎤 Start Recording
        </button>
      ) : (
        <button
          type="button"
          onClick={stopRecording}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          ⏹ Stop Recording
        </button>
      )}

      {audioUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600 mb-2">
            Recording Ready
          </p>

          <audio
            controls
            src={audioUrl}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
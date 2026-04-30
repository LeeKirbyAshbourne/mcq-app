"use client";

import { useState } from "react";

export default function SetupClient({ topics }: { topics: string[] }) {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedTopics, setSelectedTopics] = useState([topics[0] || ""]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-md border rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-center">Choose Your Quiz</h1>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="block mb-2 font-medium">Choose topics</span>

            <div className="space-y-2 border rounded-lg p-4 max-h-64 overflow-y-auto">
              {topics.map((topic) => (
                <label key={topic} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTopics([...selectedTopics, topic]);
                      } else {
                        setSelectedTopics(
                          selectedTopics.filter((t) => t !== topic)
                        );
                      }
                    }}
                  />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </label>

          <label className="block">
            <span className="block mb-2 font-medium">Number of questions</span>
            <input
              className="w-full border rounded-lg px-4 py-3"
              type="number"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              min={1}
            />
          </label>

          <label className="block">
            <span className="block mb-2 font-medium">Time allowed</span>

            <div className="flex items-center gap-3">
              <input
                className="w-20 border rounded-lg px-4 py-3 text-center"
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                min={0}
              />

              <span>minutes</span>

              <input
                className="w-20 border rounded-lg px-4 py-3 text-center"
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                min={0}
                max={59}
              />

              <span>seconds</span>
            </div>
          </label>

          <a
            href={`/quiz?topics=${selectedTopics.join(",")}&count=${questionCount}&minutes=${minutes}&seconds=${seconds}`}
          >
            <button className="w-full bg-black text-white rounded-lg py-3">
              Start Quiz
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
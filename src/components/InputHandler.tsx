"use client";
import useSWR from "swr";
import { FormEvent, useState } from "react";
import fetchSuggestions from "@/utils/fetchSuggestions";
import fetchImages from "@/utils/fetchImages";
import toast from "react-hot-toast";

function InputHandler() {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestions, {
    revalidateOnFocus: false,
  });
  const { mutate: getImages } = useSWR("/api/fetchImages", fetchImages, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };
  const submitPrompt = async (useSuggestion?: boolean) => {
    const promptInput = input;
    setInput("");
    const noti_prompt = input || suggestion;
    const noti_prompt_shorten = noti_prompt.slice(0, 20);

    const notification = toast.loading(
      `DALL·E is Generating: ${noti_prompt_shorten}`
    );
    const prompt = useSuggestion ? suggestion : promptInput;
    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error, { id: notification });
    } else {
      toast.success(`Your AI has been Generated!!!`, {
        id: notification,
      });
    }
    return getImages(data);
  };

  return (
    <div className="m-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row divide-x shadow-slate-400/10 border rounded-md"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 md:p-4
           focus:outline-none rounded-md text-gray-500"
          placeholder={
            (loading && "ChatGPT is Thinking for a suggestion...") ||
            suggestion ||
            "Type your prompt here..."
          }
        />
        <button
          disabled={!input}
          className={`p-4 font-semibold ${
            input
              ? "bg-blue-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          type="submit"
        >
          Generate
        </button>
        <button
          className="p-4 bg-blue-300 text-white font-bold transition-colors duration-200 disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          className="p-4 text-blue-500 font-bold border-none transition-colors duration-200 rounded-b-md md:rounded-r-md"
          type="button"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p className="font-semibold text-gray-500">
          Suggestion:{" "}
          <span className="italic pt-2 pl-2 font-light text-blue-300">
            {loading ? "Chatgpt is thinking..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default InputHandler;

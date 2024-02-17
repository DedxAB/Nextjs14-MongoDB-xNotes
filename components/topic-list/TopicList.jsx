"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import RemoveBtn from "../removebtn/RemoveBtn";
import { BASE_URL } from "@/utils/constants";

const getTopics = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/topics`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error fetching topics");
    return await res.json();
  } catch (error) {
    return { error: error.message };
  }
};

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
    const result = await getTopics();
    if (result.error) {
      setError(result.error);
    } else {
      setTopics(result.topics);
    }
    };
    fetchTopics();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {topics.map((topic) => (
        <div
          className="border flex justify-between gap-3 mb-3 rounded px-4 py-2 shadow cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
          key={topic._id}
        >
          <div>
            <h2 className="text-lg font-bold underline">{topic.title}</h2>
            <h2 className="font-bold mt-2">{topic.description}</h2>
          </div>
          <div className="flex justify-between items-center">
            <Link href={`/edit-topic/${topic._id}`}>
              <Button variant="outline" size="icon" className="mr-2">
                <Pencil className="w-4" />
              </Button>
            </Link>
            <RemoveBtn id={topic._id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicList;

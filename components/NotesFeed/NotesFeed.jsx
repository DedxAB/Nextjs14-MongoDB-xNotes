import { BASE_URL } from "@/utils/constants";
import NoteCard from "../NoteCard/NoteCard";

const getTopics = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/topics`, {
      cache: "no-store", // Disable cache
    });
    if (!res.ok) throw new Error("Error fetching Notes");
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};
const NotesFeed = async () => {
  let topics = []; // Define topics outside of the try block

  try {
    const response = await getTopics();
    topics = response.notes; // Assign the value inside the try block
    // console.log(topics);
  } catch (error) {
    console.log(error.message);
  }

  /* 
  {
    _id: '65fd82b743f93605c6ecc5a4',
    title: 'Tailwind Gradient',
    description: 'TAILWIND CSS GRADIENT GENERATOR.\n' +
      'TailwindGradient.com is a user-friendly web tool designed to mix Tailwind CSS Colors and generate stunning text and background allowing you to achieve the perfect colors. you can easily copy and paste the class names.',
    author: {
      _id: '65fd620f650dea0c24bd294d',
      email: 'hawtsauce.signin@gmail.com',
      name: 'Hawt Sauce',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocIRxM9_MlMj8YWfXmuEZdMPoT10ivNvqW6HeOWMbNvAGg=s96-c',
      username: 'hawtsauce.signin',
      createdAt: '2024-03-22T10:48:47.962Z',
      updatedAt: '2024-03-27T09:37:44.320Z',
      __v: 0,
      notes: [Array]
    },
    createdAt: '2024-03-22T13:08:07.545Z',
    updatedAt: '2024-03-23T15:55:24.030Z',
    __v: 0
  }
  */

  return (
    <>
      {/* Show the topic card */}
      {topics?.map((note) => {
        // console.log(topic);
        return (
          <NoteCard
            key={note?._id}
            note={note}
            user={note?.author}
          />
        );
      })}
    </>
  );
};

export default NotesFeed;

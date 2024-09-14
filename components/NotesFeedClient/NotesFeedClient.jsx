"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import useIntersectionObserver from "@/utils/hooks";
import { fetchAllNotesForClient } from "@/services/note/client/note.service";

import NoteCard from "../NoteCard/NoteCard";
import { CircularRing } from "../Skeleton/CircularRing";

const MIN_LOADING_TIME = 1000;
const NOTES_PER_PAGE = 10;

export const NotesFeedClient = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [page, setPage] = useState(2); // Start from page 2 as page 1 is already fetched
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more notes

  // Memoize loaderRef and threshold value
  const [loaderRef, isIntersecting] = useIntersectionObserver(
    useMemo(() => ({ threshold: 1.0 }), [])
  );

  const loadMoreNotes = useCallback(async () => {
    if (loading || !hasMore) return; // Stop if already loading or no more notes
    setLoading(true);

    const startTime = Date.now();

    try {
      const { data: newNotes = [] } = (await fetchAllNotesForClient(
        page,
        NOTES_PER_PAGE
      )) ?? { data: [] };

      // Ensure the loading spinner shows for at least MIN_LOADING_TIME
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsedTime)
        );
      }

      // Update state after successful data fetch
      if (newNotes.length > 0) {
        setNotes((prevNotes) => [...prevNotes, ...newNotes]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more notes to fetch
      }
    } catch (error) {
      console.error("Error fetching more notes:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, hasMore]);

  // Trigger loadMoreNotes when the loader element is in view
  useEffect(() => {
    if (isIntersecting) {
      loadMoreNotes();
    }
  }, [isIntersecting, loadMoreNotes]);

  const renderedNotes = useMemo(
    () =>
      notes.map((note) => (
        <NoteCard key={note?._id} note={note} noteAuthor={note?.author} />
      )),
    [notes]
  );

  return (
    <>
      {renderedNotes}
      {hasMore && (
        <div ref={loaderRef} className="loader grid place-items-center mb-40">
          {loading && <CircularRing />}
        </div>
      )}
      {!hasMore && (
        <p className="text-center mt-4 mb-40">No more notes available</p>
      )}
    </>
  );
};

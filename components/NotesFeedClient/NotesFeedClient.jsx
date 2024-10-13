'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNotes } from '@/context/NotesContext';
import { fetchAllNotesForClient } from '@/services/note/client/note.service';
import useIntersectionObserver from '@/utils/hooks';

import NoteCard from '../NoteCard/NoteCard';
import { CircularRing } from '../Skeleton/CircularRing';

const NOTES_PER_PAGE = 10;
const DEBOUNCE_DELAY = 500;

export const NotesFeedClient = ({ initialNotes }) => {
  const { notes, setNotes, hasMoreNotes, setHasMoreNotes, page, setPage } =
    useNotes();
  const [loading, setLoading] = useState(false);
  const [loaderRef, isIntersecting] = useIntersectionObserver({
    threshold: 1.0,
  });
  const [debounced, setDebounced] = useState(false);

  useEffect(() => {
    if (notes.length === 0 && initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialNotes, notes.length, setNotes]);

  const loadMoreNotes = useCallback(async () => {
    if (loading || debounced || !hasMoreNotes) return;

    setLoading(true);
    setDebounced(true);

    try {
      const { data: newNotes = [] } =
        (await fetchAllNotesForClient(page + 1, NOTES_PER_PAGE)) || {};

      if (newNotes.length > 0) {
        setNotes((prevNotes) => [...prevNotes, ...newNotes]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMoreNotes(false);
      }
    } catch (error) {
      console.error('Error loading more notes:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setDebounced(false), DEBOUNCE_DELAY);
    }
  }, [
    loading,
    debounced,
    hasMoreNotes,
    page,
    setNotes,
    setPage,
    setHasMoreNotes,
  ]);

  useEffect(() => {
    if (isIntersecting && !loading && hasMoreNotes) {
      loadMoreNotes();
    }
  }, [isIntersecting, loading, hasMoreNotes, loadMoreNotes]);

  const renderedNotes = useMemo(
    () =>
      notes.map((note) => (
        <NoteCard key={note._id} note={note} noteAuthor={note?.author} />
      )),
    [notes]
  );

  return (
    <>
      {renderedNotes}
      {hasMoreNotes && (
        <div ref={loaderRef} className="loader grid place-items-center mb-40">
          {loading && <CircularRing />}
        </div>
      )}
      {!hasMoreNotes && (
        <p className="text-center mt-4 mb-40">No more notes available</p>
      )}
    </>
  );
};

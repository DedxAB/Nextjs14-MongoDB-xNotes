'use client';

import { createContext, useContext, useState } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]); // Store notes in state
  const [hasMoreNotes, setHasMoreNotes] = useState(true);
  const [page, setPage] = useState(1);

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, hasMoreNotes, setHasMoreNotes, page, setPage }}
    >
      {children}
    </NotesContext.Provider>
  );
};

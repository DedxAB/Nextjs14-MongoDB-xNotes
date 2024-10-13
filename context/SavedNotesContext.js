'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { handleCheckAllSavedNotes } from '@/actions/note.actions';

const SavedNotesContext = createContext();

export const SavedNotesProvider = ({ children }) => {
  const { data: session } = useSession();
  const [savedNotesMap, setSavedNotesMap] = useState({});

  useEffect(() => {
    const fetchSavedNotes = async () => {
      if (session?.user?.id) {
        const savedNotes = await handleCheckAllSavedNotes(session.user.id);
        setSavedNotesMap(savedNotes);
      }
    };

    fetchSavedNotes();
  }, [session?.user?.id]);

  return (
    <SavedNotesContext.Provider value={{ savedNotesMap, setSavedNotesMap }}>
      {children}
    </SavedNotesContext.Provider>
  );
};

export const useSavedNotes = () => useContext(SavedNotesContext);

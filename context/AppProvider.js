import { NotesProvider } from './NotesContext';
import { SavedNotesProvider } from './SavedNotesContext';

export default function AppProvider({ children }) {
  return (
    <NotesProvider>
      <SavedNotesProvider>{children}</SavedNotesProvider>
    </NotesProvider>
  );
}

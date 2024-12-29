import { NotesProvider } from './NotesContext';
import { NotificationProvider } from './NotificationContext';
import { SavedNotesProvider } from './SavedNotesContext';

export default function AppProvider({ children }) {
  return (
    <NotesProvider>
      <NotificationProvider>
        <SavedNotesProvider>{children}</SavedNotesProvider>
      </NotificationProvider>
    </NotesProvider>
  );
}

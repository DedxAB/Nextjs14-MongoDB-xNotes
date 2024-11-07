'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useSavedNotes } from '@/context/SavedNotesContext';
import { SaveIcon } from '@/app/assets/svgs/GeneralIcons';

export default function SaveNotes({ note }) {
  const { data: session } = useSession();
  const { savedNotesMap, setSavedNotesMap } = useSavedNotes();
  const router = useRouter();

  const isSaved = savedNotesMap[note?._id] || false;

  const handleSave = async () => {
    if (!session) {
      toast.error('You need to sign in to save notes');
      return;
    }
    const toastId = toast.loading(`${isSaved ? 'Removing' : 'Saving'} note...`);
    try {
      const response = await fetch(`/api/saved-notes`, {
        method: isSaved ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          noteId: note?._id,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      toast.success(`${isSaved ? 'Note unsaved' : 'Note saved'} successfully`, {
        id: toastId,
      });

      // Update context
      setSavedNotesMap((prev) => ({
        ...prev,
        [note?._id]: !isSaved,
      }));

      router.refresh();
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <div onClick={handleSave}>
      {!isSaved ? (
        <SaveIcon className="w-4 h-4 text-foreground" fill="none" />
      ) : (
        <SaveIcon className="w-4 h-4 text-primary" fill="#E11D48" />
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';

import { Mic } from 'lucide-react';
import { toast } from 'sonner';

const VoiceToText = ({ setDescription, description, maxCharCount }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const resultOffset = useRef(0); // Tracks the last processed result index

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false; // Process finalized results only

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        resultOffset.current = 0; // Reset offset when starting
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        const errorMessages = {
          network: 'Network issue detected. Please check your connection.',
          'not-allowed': 'Microphone access denied. Please enable permissions.',
          'no-speech': 'No speech detected. Please try again.',
          aborted: 'Speech recognition aborted.',
        };
        toast.error(errorMessages[event.error] || `Error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        const newResults = Array.from(event.results)
          .slice(resultOffset.current) // Process only unprocessed results
          .filter((result) => result.isFinal)
          .map((result) => result[0].transcript)
          .join(' ');

        resultOffset.current = event.results.length; // Update offset to the last processed result

        if (newResults) {
          if (description.length + newResults.length >= maxCharCount) {
            toast.error('Character limit exceeded.');
            return;
          }
          setDescription((prev) =>
            prev ? `${prev}. ${newResults}` : newResults
          );
        }
      };
    } else {
      toast.error(
        'Speech recognition is not supported in this browser. Please try Chrome or Edge.'
      );
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setDescription, description, maxCharCount]);

  const handleVoiceToText = () => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition not initialized.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <div onClick={handleVoiceToText}>
      {isListening ? (
        <Mic className="w-4 h-4 animate-pulse text-primary" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </div>
  );
};

export default VoiceToText;

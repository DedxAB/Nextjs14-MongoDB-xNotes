'use client';

import { useState, useEffect } from 'react';

import { AudioLines } from 'lucide-react';

import { StopListening } from '@/app/assets/svgs/GeneralIcons';

export default function TextToSpeech({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      // Set default to Microsoft Zira voice
      const ziraVoice = availableVoices.find((voice) =>
        voice.name.toLowerCase().includes('zira')
      );
      setSelectedVoice(ziraVoice || availableVoices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = 1.0;
      utterance.pitch = 1.2;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  const handleStopListening = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div onClick={isSpeaking ? handleStopListening : handleTextToSpeech}>
      {isSpeaking ? (
        <StopListening className="w-4 h-4 text-primary" />
      ) : (
        <AudioLines className="w-4 h-4" />
      )}
    </div>
  );
}

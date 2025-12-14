/**
 * TaskCompletionModal Component
 * Modal for adding text, photo, audio after task completion
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Type, Camera, Mic, Share2, X, Check, StopCircle } from "lucide-react";
import { Button, Textarea, Card } from "../framework";
import { HeartIcon } from "./icons/HeartIcon";

type TaskCompletionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    text?: string;
    photoDataUrl?: string;
    audioDataUrl?: string;
  }) => void;
  taskTitle: string;
};

export function TaskCompletionModal({
  isOpen,
  onClose,
  onSubmit,
  taskTitle,
}: TaskCompletionModalProps) {
  const [activeMode, setActiveMode] = useState<"text" | "photo" | "audio" | null>(null);
  const [text, setText] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [audioDataUrl, setAudioDataUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // ==================== Photo Upload ====================

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoDataUrl(reader.result as string);
      setActiveMode("photo");
    };
    reader.readAsDataURL(file);
  };

  // ==================== Audio Recording ====================

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioDataUrl(audioUrl);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setActiveMode("audio");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please grant permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // ==================== Share ====================

  const handleShare = async () => {
    const shareData = {
      title: "Task Completed! 🎉",
      text: `I just completed: "${taskTitle}"`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    } else {
      // Fallback: try clipboard, but handle permission errors gracefully
      try {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}`
        );
        alert("Copied to clipboard!");
      } catch (error) {
        // If clipboard fails, show the text for manual copying
        const textToCopy = `${shareData.title}\n${shareData.text}`;
        const confirmed = confirm(
          `Share not available. Copy this text manually:\n\n${textToCopy}\n\nPress OK to close.`
        );
        console.log("Clipboard API not available:", error);
      }
    }
  };

  // ==================== Submit ====================

  const handleSubmit = () => {
    onSubmit({
      text: text.trim() || undefined,
      photoDataUrl: photoDataUrl || undefined,
      audioDataUrl: audioDataUrl || undefined,
    });
    // Reset state
    setText("");
    setPhotoDataUrl(null);
    setAudioDataUrl(null);
    setActiveMode(null);
    onClose();
  };

  const handleSkip = () => {
    onSubmit({});
    setText("");
    setPhotoDataUrl(null);
    setAudioDataUrl(null);
    setActiveMode(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card className="relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <HeartIcon size={48} variant="fire" animated />
              </div>
              <h2 className="text-2xl font-black uppercase">Task Complete! 🎉</h2>
              <p className="text-sm text-black/70 mt-2">{taskTitle}</p>
            </div>

            {/* Action buttons */}
            {activeMode === null && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setActiveMode("text")}
                  className="p-6 rounded-2xl border-[3px] border-[#1976D2] bg-white hover:bg-[#E3F2FD] transition-all hover:translate-y-[-2px] active:translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
                >
                  <Type size={32} className="mx-auto mb-2 text-[#1976D2]" />
                  <div className="text-sm font-bold uppercase">Text</div>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-[3px] border-[var(--hot-pink)] bg-white hover:bg-[#FFE5EC] transition-all hover:translate-y-[-2px] active:translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
                >
                  <Camera size={32} className="mx-auto mb-2 text-[var(--hot-pink)]" />
                  <div className="text-sm font-bold uppercase">Photo</div>
                </button>

                <button
                  onClick={startRecording}
                  className="p-6 rounded-2xl border-[3px] border-[var(--fire-orange)] bg-white hover:bg-[#FFF3E5] transition-all hover:translate-y-[-2px] active:translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
                >
                  <Mic size={32} className="mx-auto mb-2 text-[var(--fire-orange)]" />
                  <div className="text-sm font-bold uppercase">Audio</div>
                </button>

                <button
                  onClick={handleShare}
                  className="p-6 rounded-2xl border-[3px] border-[var(--lime)] bg-white hover:bg-[#F0FFE5] transition-all hover:translate-y-[-2px] active:translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
                >
                  <Share2 size={32} className="mx-auto mb-2 text-[var(--lime)]" />
                  <div className="text-sm font-bold uppercase">Share</div>
                </button>
              </div>
            )}

            {/* Text input mode */}
            {activeMode === "text" && (
              <div className="mb-6">
                <Textarea
                  value={text}
                  onChange={setText}
                  placeholder="Write your thoughts, feelings, or reflections..."
                  rows={6}
                  label="Your Note"
                />
                <button
                  onClick={() => setActiveMode(null)}
                  className="mt-3 text-sm text-black/60 underline"
                >
                  ← Back to options
                </button>
              </div>
            )}

            {/* Photo preview */}
            {activeMode === "photo" && photoDataUrl && (
              <div className="mb-6">
                <div className="text-sm font-bold uppercase mb-2">Photo Preview</div>
                <img
                  src={photoDataUrl}
                  alt="Preview"
                  className="w-full rounded-2xl border-[3px] border-[#1976D2]"
                />
                <button
                  onClick={() => {
                    setPhotoDataUrl(null);
                    setActiveMode(null);
                  }}
                  className="mt-3 text-sm text-black/60 underline"
                >
                  ← Remove photo
                </button>
              </div>
            )}

            {/* Audio recording */}
            {activeMode === "audio" && (
              <div className="mb-6 text-center">
                {isRecording ? (
                  <div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block mb-4"
                    >
                      <StopCircle size={64} className="text-[var(--fire-red)]" />
                    </motion.div>
                    <div className="text-lg font-bold uppercase mb-4">Recording...</div>
                    <Button onClick={stopRecording} variant="danger">
                      Stop Recording
                    </Button>
                  </div>
                ) : audioDataUrl ? (
                  <div>
                    <div className="text-sm font-bold uppercase mb-2">Audio Recorded ✓</div>
                    <audio src={audioDataUrl} controls className="w-full mb-4" />
                    <button
                      onClick={() => {
                        setAudioDataUrl(null);
                        setActiveMode(null);
                      }}
                      className="text-sm text-black/60 underline"
                    >
                      ← Record again
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {/* Submit buttons */}
            <div className="flex gap-3">
              <Button onClick={handleSkip} variant="ghost" fullWidth>
                Skip
              </Button>
              <Button onClick={handleSubmit} variant="primary" fullWidth>
                <Check size={18} />
                Done
              </Button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
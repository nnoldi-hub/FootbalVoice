import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause, RotateCcw } from 'lucide-react';

interface VoiceRecorderProps {
  onTitleRecorded: (title: string) => void;
  onContentRecorded: (content: string) => void;
}

type RecordingType = 'title' | 'content' | 'both';

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTitleRecorded, onContentRecorded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingType, setRecordingType] = useState<RecordingType>('both');
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    setRecordingTime(0);
    stopTimer();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        processAudioRecording(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Nu s-a putut accesa microfonul. Verificați permisiunile.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        startTimer();
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        stopTimer();
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      stopTimer();
    }
  };

  const resetRecording = () => {
    if (isRecording) {
      stopRecording();
    }
    resetTimer();
    audioChunksRef.current = [];
  };

  const processAudioRecording = (audioBlob: Blob) => {
    // Simulăm procesarea audio-ului și conversia la text
    const simulatedText = generateSimulatedText();
    
    if (recordingType === 'title') {
      onTitleRecorded(simulatedText.title);
    } else if (recordingType === 'content') {
      onContentRecorded(simulatedText.content);
    } else {
      onTitleRecorded(simulatedText.title);
      onContentRecorded(simulatedText.content);
    }
  };

  const generateSimulatedText = () => {
    const titles = [
      "Analiza detaliată a meciului de aseară",
      "Portretul celui mai promițător jucător",
      "Ultimele știri din lumea transferurilor",
      "Predicțiile mele pentru următorul meci",
      "Interviu exclusiv cu starul echipei"
    ];
    
    const contents = [
      "În această analiză, voi detalia momentele cheie ale meciului și voi explica deciziile tactice care au influențat rezultatul final. Echipa gazdă a dominat prima repriză, dar oaspeții au reușit să egaleze printr-o contraatac perfect executat.",
      "Acest jucător tânăr a demonstrat un potențial extraordinar în ultimele meciuri. Tehnica sa rafinată și viziunea de joc îl fac să fie unul dintre cei mai urmăriți talente din fotbalul european actual.",
      "Transferul de vară cel mai discutat pare să fie pe cale să se finalizeze. Surse apropiate clubului confirmă că negocierile au intrat în faza finală și anunțul oficial ar putea veni în următoarele zile."
    ];

    return {
      title: titles[Math.floor(Math.random() * titles.length)],
      content: contents[Math.floor(Math.random() * contents.length)]
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    if (isRecording && !isPaused) return 'text-red-500';
    if (isPaused) return 'text-yellow-500';
    return 'text-gray-500';
  };

  const getStatusText = () => {
    if (isRecording && !isPaused) return 'Se înregistrează...';
    if (isPaused) return 'Întrerupt';
    return 'Pregătit pentru înregistrare';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Mic className="w-6 h-6 mr-2 text-blue-600" />
          Înregistrare Vocală
        </h3>
        <div className="text-right">
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </div>
          <div className="text-lg font-mono text-gray-600">
            {formatTime(recordingTime)}
          </div>
        </div>
      </div>

      {/* Recording Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ce dorești să înregistrezi?
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'title', label: 'Doar Titlul' },
            { value: 'content', label: 'Doar Conținutul' },
            { value: 'both', label: 'Titlu + Conținut' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setRecordingType(option.value as RecordingType)}
              disabled={isRecording}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                recordingType === option.value
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Mic className="w-5 h-5" />
            <span className="font-medium">Start</span>
          </button>
        ) : (
          <>
            <button
              onClick={pauseRecording}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${
                isPaused 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              <span className="font-medium">{isPaused ? 'Continuă' : 'Pauză'}</span>
            </button>
            
            <button
              onClick={stopRecording}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Square className="w-5 h-5" />
              <span className="font-medium">Stop</span>
            </button>
          </>
        )}
        
        <button
          onClick={resetRecording}
          className="flex items-center space-x-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {isRecording && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Înregistrare activă pentru: {recordingType === 'both' ? 'titlu și conținut' : recordingType === 'title' ? 'titlu' : 'conținut'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
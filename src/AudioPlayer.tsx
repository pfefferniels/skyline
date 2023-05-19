import React, { useRef, useEffect, ChangeEvent, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { PlayArrow, Pause, CloudUpload, AudioFileOutlined } from '@mui/icons-material';

interface AudioPlayerProps {
  onTimeUpdate: (time: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onTimeUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioLoaded, setAudioLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          onTimeUpdate(audioRef.current.currentTime);
        }
      };
    }
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      console.log('file=', file, audioRef.current)
      const url = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = url;
        setAudioLoaded(true);
      }
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div>
      <audio 
        ref={audioRef} />
      <input 
        ref={fileInputRef} 
        type="file" 
        onChange={handleFileChange} 
        accept="audio/*" 
        style={{ display: 'none' }} 
      />
      <Tooltip title="Load Audio">
        <IconButton 
          color="primary" 
          onClick={() => fileInputRef.current?.click()}
        >
          <AudioFileOutlined />
        </IconButton>
      </Tooltip>
      {isAudioLoaded && (
        <>
          <IconButton onClick={handlePlay}>
            <PlayArrow />
          </IconButton>
          <IconButton onClick={handlePause}>
            <Pause />
          </IconButton>
        </>
      )}
    </div>
  );
}

export default AudioPlayer;

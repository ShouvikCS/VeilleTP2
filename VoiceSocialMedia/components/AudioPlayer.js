import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Box } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomIcon from './CustomIcon';

const AudioPlayer = ({ source }) => {
  const [sound, setSound] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);

  useEffect(() => {
    async function loadAudio() {
      const { sound } = await Audio.Sound.createAsync(source);
      setSound(sound);
    }

    loadAudio();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [source]);

  const togglePlay = async () => {
    if (sound) {
      isPlaying ? await sound.pauseAsync() : await sound.playAsync();
    }
  };

  if (sound) {
    sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      setPlaybackStatus(playbackStatus);
      if (playbackStatus.didJustFinish) {
        sound.stopAsync();
        sound.setPositionAsync(0);
      }
    });
  }

  const isPlaying = playbackStatus && playbackStatus.isPlaying;
  const duration = playbackStatus && playbackStatus.durationMillis;
  const position = playbackStatus && playbackStatus.positionMillis;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box>
      <TouchableOpacity onPress={togglePlay}>
        <Text>{isPlaying ? <CustomIcon name="pause" /> : <CustomIcon name="play" />}</Text>
      </TouchableOpacity>
      {/* <Text>{isPlaying ? `${formatTime(position)} / ${formatTime(duration)}` : formatTime(duration)}</Text> */}
    </Box>
  );
};

export default AudioPlayer;

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AudioPlayer from '../services/audioPlayer';

const Recording = ({ uri }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = new AudioPlayer();

  const togglePlayback = async () => {
    if (isPlaying) {
      try {
        await audioPlayer.pauseAudio();
      } catch (error) {
        console.error('Error pausing audio', error);
      }
    } else {
      try {
        await audioPlayer.loadAudio(uri);
        await audioPlayer.playAudio();
      } catch (error) {
        console.error('Error playing audio', error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
      <TouchableOpacity onPress={togglePlayback}>
        <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Recording;

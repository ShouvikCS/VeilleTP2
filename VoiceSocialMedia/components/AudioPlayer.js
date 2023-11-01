import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = ({ source }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function loadAudio() {
    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
  }

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [source]);

  const togglePlay = async () => {
    if (sound) {
      isPlaying ? await sound.pauseAsync() : await sound.playAsync();
      setIsPlaying(!isPlaying);
    }
  };

  if (sound) {
    sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      if (playbackStatus.didJustFinish) {
        sound.stopAsync();
        sound.setPositionAsync(0);
        setIsPlaying(false);
      }
    });
  }

  return (
    <View>
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={() => togglePlay()}
      />
    </View>
  );
};

export default AudioPlayer;

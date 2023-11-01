import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = ({ source }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadAudio() {
      const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(sound);
      setIsLoaded(true);
    }

    loadAudio();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [source]);

  const togglePlay = async () => {
    if (isLoaded) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !status.isPlaying && status.durationMillis === status.positionMillis) {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
        setIsPlaying(false);
        setIsLoaded(false);
      }
    }
  };

  return (
    <View>
      <Button
        title={isLoaded ? (isPlaying ? 'Pause' : 'Play') : 'Locked'}
        onPress={() => togglePlay()}
        disabled={!isLoaded}
      />
    </View>
  );
};

export default AudioPlayer;

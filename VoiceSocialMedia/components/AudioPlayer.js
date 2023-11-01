import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = ({ source }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadAudio() {
      if (source) {
        console.log('Loading audio from', source);
        try {
          const { sound } = await Audio.Sound.createAsync(
            source,
            { shouldPlay: false },
            onPlaybackStatusUpdate
          );
          setSound(sound);
          setIsLoaded(true);
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      }
    }

    loadAudio();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [source]);

  const togglePlay = async () => {
    if (isLoaded && sound) {
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

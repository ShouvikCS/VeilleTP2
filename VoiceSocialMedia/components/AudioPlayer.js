import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';

const AudioPlayer = ({ source }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      <Text>{source.user}</Text>
      <TouchableOpacity onPress={togglePlay}>
        <Text>{isPlaying ? <Icon name="pause" size={30} /> : <Icon name="play" size={30} />}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;

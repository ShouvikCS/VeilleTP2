import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RecordingsDB from './services/db';
import Friend from './models/friend';
import AudioPlayer from './components/AudioPlayer';
import AudioRecorder from './components/AudioRecorder';

export default function App() {

  const Steve = new Friend('Steve', [
    require('./audios/steveAudio1.mp3'),
    require('./audios/steveAudio2.mp3'),
    require('./audios/steveAudio3.mp3')
  ]);

  useEffect(() => {
    RecordingsDB.initDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <AudioPlayer source={require('./audios/startJingle.mp3')} />
      <AudioRecorder />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
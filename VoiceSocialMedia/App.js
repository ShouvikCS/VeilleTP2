import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import RecordingsDB from './services/db';
import Friend from './models/friend';
import Recording from './components/Recording';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{Steve.audios[0]}</Text>
      <Recording uri={Steve.audios[0]} />
    </View>
  );

}

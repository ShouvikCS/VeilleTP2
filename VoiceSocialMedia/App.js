import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AudioPlayer from './components/AudioPlayer';
import AudioRecorder from './components/AudioRecorder';
import Recording from './models/recording';
import RecordingsDB from './services/db';

export default function App() {
  const [recordings, setRecordings] = useState([]);

  const updateRecordings = useCallback(async () => {
    const data = await RecordingsDB.getAllRecordings();
    const recordingsList = data.map(rec => new Recording(rec.id, rec.uri, rec.user));
    setRecordings(recordingsList);
  }, []);

  useEffect(() => {
    updateRecordings();
  }, [updateRecordings]);

  return (
    <View style={styles.container}>
      <AudioRecorder onNewRecording={updateRecordings} />
      {recordings.map(recording => (
        <View key={recording.id}>
          <AudioPlayer source={{ uri: recording.uri, user: recording.user }} />
        </View>
      ))}
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
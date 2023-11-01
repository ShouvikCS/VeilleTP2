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
      {recordings.length > 0 && recordings.map(recording => (
        <AudioPlayer key={recording.id} source={recording.uri} />
      ))}
      <AudioRecorder onNewRecording={updateRecordings} />
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
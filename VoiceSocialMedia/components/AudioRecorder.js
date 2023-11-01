import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import RecordingsDB from '../services/db';

const AudioRecorder = ({ onNewRecording }) => {
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [recordingObject, setRecordingObject] = useState(null);

  const startJingle = new Audio.Sound();
  const stopJingle = new Audio.Sound();

  const loadJingles = async () => {
    await startJingle.loadAsync(require('../audios/startJingle.mp3'));
    await stopJingle.loadAsync(require('../audios/stopJingle.mp3'));
  };

  useEffect(() => {
    async function setupRecorder() {
      const { status } = await Audio.getPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Audio recording permissions are not granted');
        return;
      }

      const recording = new Audio.Recording();
      try {
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecordingObject(recording);
        await loadJingles();
      } catch (error) {
        console.error('Failed to prepare audio recording:', error);
      }
    }

    setupRecorder();
  }, []);

  const startRecording = async () => {
    try {
      if (recordingObject && recordingObject._canRecord) {
        if (!startJingle._loaded) {
          await loadJingles();
        }
        await startJingle.replayAsync();
        await recordingObject.startAsync();
        setRecordingStatus(true);
      } else {
        console.error('Recording object is not ready.');
      }
    } catch (error) {
      console.error('Failed to start recording:', error);
      setRecordingStatus(false);
    }
  }

  const stopRecording = async () => {
    try {
      await recordingObject.stopAndUnloadAsync();
      const uri = recordingObject.getURI();
      await saveRecording(uri);
      setRecordingStatus(false);
      onNewRecording();
      if (startJingle._loaded) {
        await stopJingle.replayAsync();
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const saveRecording = async (uri) => {
    const fileExtension = uri.split('.').pop();
    const timestamp = new Date().getTime();
    const newUri = `${FileSystem.documentDirectory}recording_${timestamp}.${fileExtension}`;

    await FileSystem.copyAsync({
      from: uri,
      to: newUri
    });

    RecordingsDB.addRecording(newUri, 'Me');
  };

  return (
    <View>
      <Button
        title={recordingStatus ? 'Stop Recording' : 'Start Recording'}
        onPress={() => recordingStatus ? stopRecording() : startRecording()}
      />
    </View>
  );
};

export default AudioRecorder;

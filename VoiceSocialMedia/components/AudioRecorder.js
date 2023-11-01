import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
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

  const toggleRecording = async () => {
    if (recording) {
      try {
        await recordingObject.stopAndUnloadAsync();
        setRecording(false);
        if (startJingle._loaded) {
          await stopJingle.replayAsync();
        }
      } catch (error) {
        console.error('Failed to stop recording:', error);
      }
    } else {
      try {
        if (!startJingle._loaded) {
          await loadJingles();
        }
        await startJingle.replayAsync();
        await recordingObject.startAsync();
        setRecording(true);
      } catch (error) {
        console.error('Failed to start recording:', error);
        setRecording(false);
      }
    }
  };

  return (
    <View>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={() => toggleRecording()}
      />
    </View>
  );
};

export default AudioRecorder;

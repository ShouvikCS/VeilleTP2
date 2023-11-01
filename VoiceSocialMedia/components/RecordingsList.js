import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AudioPlayer from './AudioPlayer';

function RecordingsList({ recordings }) {
  return (
    <View>
      {recordings && recordings.map(recording => (
        <AudioPlayer key={recording.id} source={recording.uri} />
      ))}
    </View>
  );
}

export default RecordingsList;

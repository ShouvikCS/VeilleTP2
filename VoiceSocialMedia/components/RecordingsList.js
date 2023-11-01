import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AudioPlayer from './AudioPlayer';
import RecordingsDB from '../services/db';

function RecordingsList({ recordings }) {
  return (
    <View>
      <Text>Items: {recordings.length}</Text>
    </View>
  );
}

export default RecordingsList;

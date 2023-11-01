import React from 'react';
import { Box, VStack } from "native-base";
import AudioPlayer from './AudioPlayer';

const VoiceMessagesList = ({ recordings }) => {
  return (
    <VStack space={4} safeArea style={{ marginTop: 40, marginHorizontal: 20 }}>
      {recordings.map(recording => (
        <Box width={recording.user === 'Me' ? '50%' : '70%'} alignSelf={recording.user === 'Me' ? 'flex-end' : ''} p={4} rounded="xl" bg={recording.user === 'Me' ? 'blue.400' : 'gray.300'} key={recording.id}>
          <AudioPlayer source={{ uri: recording.uri, user: recording.user }} />
        </Box>
      ))}
    </VStack >
  );
}


export default VoiceMessagesList;
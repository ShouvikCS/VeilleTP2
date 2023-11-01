import React from 'react';
import { Box, Text, VStack } from "native-base";
import AudioPlayer from './AudioPlayer';

const VoiceMessagesList = ({ recordings }) => {
  return (
    <VStack space={4} safeArea>
      {recordings.map(recording => (
        <Box key={recording.id}>
          <Text alignSelf={recording.user === 'Me' ? 'flex-end' : ''}> {recording.user} </Text>
          <Box width={recording.user === 'Me' ? '50%' : '70%'} alignSelf={recording.user === 'Me' ? 'flex-end' : ''} p={3} rounded="xl" bg={recording.user === 'Me' ? 'blue.400' : 'dark.400'} key={recording.id}>
            <AudioPlayer source={{ uri: recording.uri, user: recording.user }} />
          </Box>
        </Box>
      ))}
    </VStack >
  );
}

export default VoiceMessagesList;
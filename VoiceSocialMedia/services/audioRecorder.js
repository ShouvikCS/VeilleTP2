import { Audio } from 'expo-av';

const recordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

const startRecording = async () => {
    try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access audio was denied');
            return;
        }

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY); // recordingOptions
        await recording.startAsync();
        console.log('Recording started');
        return recording;
    } catch (err) {
        console.error('Failed to start recording', err);
    }
};

const stopRecording = async (recording) => {
    try {
        await recording.stopAndUnloadAsync();
        console.log('Recording stopped');
        const uri = recording.getURI();
        return uri;
    } catch (err) {
        console.error('Failed to stop recording', err);
    }
};

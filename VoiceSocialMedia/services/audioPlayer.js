import { Audio } from 'expo-av';

class AudioPlayerService {
  constructor() {
    this.soundObject = new Audio.Sound();
    this.isLoaded = false;
    this.isPlaying = false;

    this.soundObject.setOnPlaybackStatusUpdate(this.handlePlaybackStatusUpdate);
  }

  handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      this.isLoaded = true;
    }
    if (status.isPlaying) {
      this.isPlaying = true;
    } else if (this.isPlaying && status.isLoaded) {
      this.unloadAudio();
    }
  };

  async loadAudio(uri) {
    try {
      await this.soundObject.loadAsync({ uri });
      console.log('Audio loaded!');
    } catch (error) {
      console.error('Could not load audio', error);
    }
  }

  async playAudio() {
    if (!this.isLoaded) {
      console.log('Audio is not loaded yet. Call loadAudio() first.');
      return;
    }

    try {
      await this.soundObject.playAsync();
      console.log('Audio playing!');
    } catch (error) {
      console.error('Could not play audio', error);
    }
  }

  async pauseAudio() {
    try {
      await this.soundObject.pauseAsync();
      console.log('Audio paused!');
    } catch (error) {
      console.error('Could not pause audio', error);
    }
  }

  async unloadAudio() {
    try {
      await this.soundObject.unloadAsync();
      console.log('Audio unloaded!');
      this.isLoaded = false;
      this.isPlaying = false;
    } catch (error) {
      console.error('Could not unload audio', error);
    }
  }
}

export default AudioPlayerService;

class MusicWrapper {
  constructor() {
    this.musicSound = null;
  }

  loopMusic(fileName) {
    setAudioFormat();

    if (this.musicSound != null) {
      this.musicSound.pause();
      this.musicSound = null;
    }
    this.musicSound = new Audio(fileName+audioFormat);
    this.musicSound.loop = true;
    this.musicSound.play();
  }

  togglePlay() {
    if (this.musicSound.paused) {
      this.musicSound.play();
    } else {
      this.musicSound.pause();
    }
  }
}
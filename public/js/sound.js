class Sound {
  constructor(src) {
      this.audio = document.createElement('audio');
      this.audio.src = src;
  }

  play() {
      this.audio.play();
  }

  stop() {
      this.audio.pause();
      this.audio.currentTime = 0;
  }

  loop() {
    this.audio.loop = true;
  }
}

let stageBgm;
const gameOverSound = new Sound('../resource/gameover.mp3');
/* AudioEngine - preloads all sounds for instant playback */
class AudioEngine {
     constructor() {
            this.soundsPath = 'sounds/';
            this.cache = {};

       const soundNames = [
                'door_slam','crack','thud','whimper',
                'crash','click','multi_slam','multi_crack',
                'multi_thud','scatter','goose','shriek','echo'
              ];

       soundNames.forEach(name => {
                const a = new Audio();
                a.preload = 'auto';
                a.src = this.soundsPath + name + '.mp3';
                a.load();
                this.cache[name] = a;
       });
     }

  play(type) {
         const a = this.cache[type];
         if (!a) return;
         a.currentTime = 0;
         a.play().catch(() => {});
  }
}

const audio = new AudioEngine();

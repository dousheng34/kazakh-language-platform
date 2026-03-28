class AudioEngine {
  constructor() { this.ctx = null; }

  _init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  _noise(dur, decay = 0.08) {
    const ctx = this.ctx;
    const n = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random()*2-1) * Math.exp(-i/(n*decay));
    const src = ctx.createBufferSource(); src.buffer = buf; return src;
  }

  _lp(freq) {
    const f = this.ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=freq; return f;
  }
  _bp(freq,q=1) {
    const f = this.ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=freq; f.Q.value=q; return f;
  }
  _gain(v, atTime) {
    const g = this.ctx.createGain(); g.gain.setValueAtTime(v, atTime ?? this.ctx.currentTime); return g;
  }

  play(type) {
    this._init();
    const t = this.ctx.currentTime;
    const ctx = this.ctx;
    const dst = ctx.destination;

    const connect = (...nodes) => {
      for (let i=0;i<nodes.length-1;i++) nodes[i].connect(nodes[i+1]);
    };

    const startStop = (src, start, dur) => { src.start(start); src.stop(start + dur); };

    const impactNoise = (t, vol=1.5, lpFreq=400, decay=0.05, dur=0.3) => {
      const src = this._noise(dur, decay);
      const lp = this._lp(lpFreq);
      const g = this._gain(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t+dur);
      connect(src, lp, g, dst); src.start(t);
    };

    const osc = (freq, type2, vol, t, dur, freqEnd) => {
      const o = ctx.createOscillator(); o.type=type2;
      o.frequency.setValueAtTime(freq,t);
      if(freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t+dur);
      const g = this._gain(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t+dur);
      connect(o, g, dst); startStop(o,t,dur);
    };

    switch(type) {
      case 'door_slam':
        impactNoise(t, 2, 300, 0.04, 0.4);
        osc(60,'sine',1,t,0.35,30);
        break;
      case 'crack':
        impactNoise(t, 2, 3000, 0.02, 0.15);
        break;
      case 'thud':
        osc(80,'sine',1.5,t,0.3,35);
        impactNoise(t, 0.8, 250, 0.06, 0.2);
        break;
      case 'snap':
        osc(1200,'square',0.7,t,0.06,200);
        break;
      case 'whimper':
        osc(750,'sine',0.35,t,0.45,350);
        break;
      case 'crash':
        impactNoise(t, 2.5, 180, 0.25, 0.7);
        osc(55,'sine',1,t,0.5,25);
        break;
      case 'click':
        osc(2200,'square',0.5,t,0.03,500);
        break;
      case 'multi_slam':
        [0,0.22,0.44].forEach(d => impactNoise(t+d, 1.5, 300, 0.04, 0.3));
        break;
      case 'multi_crack':
        [0,0.15,0.3,0.45].forEach(d => impactNoise(t+d, 1.2, 2500, 0.02, 0.12));
        break;
      case 'multi_thud':
        [0,0.25,0.5].forEach(d => { osc(75,'sine',1.2,t+d,0.25,30); impactNoise(t+d,0.5,200,0.05,0.15); });
        break;
      case 'scatter':
        [0,0.1,0.2,0.3,0.4,0.5].forEach(d => osc(800+Math.random()*400,'square',0.4,t+d,0.05,100));
        break;
      case 'goose':
        [0,0.45].forEach(d => {
          const o = ctx.createOscillator(); o.type='sawtooth';
          o.frequency.setValueAtTime(280,t+d); o.frequency.setValueAtTime(240,t+d+0.1); o.frequency.setValueAtTime(280,t+d+0.2);
          const bp = this._bp(700, 2);
          const g = this._gain(0, t+d);
          g.gain.linearRampToValueAtTime(0.45, t+d+0.02);
          g.gain.linearRampToValueAtTime(0, t+d+0.32);
          connect(o,bp,g,dst); startStop(o,t+d,0.35);
        });
        break;
      case 'shriek':
        [0,0.22,0.44].forEach(d => osc(1400,'sawtooth',0.3,t+d,0.18,700));
        break;
      case 'echo':
        [0,0.35,0.7,1.05].forEach((d,i) => osc(200,'sine', 0.7/(i+1), t+d, 0.3, 80));
        break;
    }
  }
}

const audio = new AudioEngine();

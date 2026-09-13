/**
 * Caixinha de música original (valsa em Fá) — sem faixa externa,
 * começa no toque do convite e funciona em iOS.
 */
const BPM = 86;
const BEAT = 60 / BPM;

const F3 = 174.61;
const A3 = 220.0;
const Bb3 = 233.08;
const C4 = 261.63;
const F4 = 349.23;
const C5 = 523.25;
const E5 = 659.25;
const F5 = 698.46;
const G5 = 783.99;
const A5 = 880.0;
const Bb5 = 932.33;
const C6 = 1046.5;
const D6 = 1174.66;
const E6 = 1318.51;
const F6 = 1396.91;

type Note = [freq: number, beats: number, offsetBeats?: number];

const MELODY: Note[] = [
  [C6, 1],
  [A5, 1],
  [F5, 1],
  [G5, 1],
  [E5, 1],
  [C5, 1],
  [A5, 1],
  [F5, 0.5],
  [A5, 0.5],
  [C6, 1],
  [Bb5, 1],
  [G5, 1],
  [E5, 1],
  [F5, 1],
  [A5, 1],
  [C6, 1],
  [D6, 1],
  [C6, 1],
  [A5, 1],
  [Bb5, 1],
  [A5, 1],
  [G5, 1],
  [F5, 2],
  [C5, 1],
  [F6, 1],
  [E6, 1],
  [C6, 1],
  [D6, 1],
  [C6, 1],
  [A5, 1],
  [Bb5, 0.5],
  [A5, 0.5],
  [G5, 1],
  [F5, 3],
];

const BASS: Note[] = [
  [F3, 3],
  [C4, 3],
  [F3, 3],
  [C4, 3],
  [Bb3, 3],
  [F3, 3],
  [C4, 3],
  [F3, 3],
  [A3, 3],
  [C4, 3],
  [Bb3, 3],
  [F3, 3],
];

const LOOP_BEATS = 36;
const LOOP_SECONDS = LOOP_BEATS * BEAT;

function ding(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  time: number,
  beats: number,
  amp: number,
) {
  const dur = Math.max(0.18, beats * BEAT * 0.95);
  const master = ctx.createGain();
  master.connect(dest);

  const partials: Array<[number, number, OscillatorType]> = [
    [1, 1, "sine"],
    [2.003, 0.32, "sine"],
    [2.997, 0.08, "sine"],
    [4.02, 0.05, "sine"],
  ];

  for (const [ratio, gain, type] of partials) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq * ratio;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(amp * gain, time + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(g).connect(master);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }
}

function bass(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  time: number,
  beats: number,
) {
  const dur = beats * BEAT * 0.9;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(0.045, time + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  osc.connect(g).connect(dest);
  osc.start(time);
  osc.stop(time + dur + 0.02);
}

function schedulePattern(ctx: AudioContext, dest: AudioNode, origin: number) {
  let t = 0;
  for (const [freq, beats] of MELODY) {
    ding(ctx, dest, freq, origin + t, beats, 0.16);
    // third above, quieter — music-box shimmer
    ding(ctx, dest, freq * 1.26, origin + t, beats, 0.035);
    t += beats * BEAT;
  }
  t = 0;
  for (const [freq, beats] of BASS) {
    bass(ctx, dest, freq, origin + t, beats);
    bass(ctx, dest, freq * 2, origin + t, 0.6);
    t += beats * BEAT;
  }
  // lingering tonic
  ding(ctx, dest, F5, origin + (LOOP_BEATS - 1) * BEAT, 2, 0.07);
  ding(ctx, dest, F4, origin + (LOOP_BEATS - 1) * BEAT, 2, 0.04);
}

export class MusicBox {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private playing = false;
  private muted = false;
  private nextLoop = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  async start() {
    if (this.playing) return;
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    this.ctx = new Ctor();
    if (this.ctx.state === "suspended") {
      await this.ctx.resume().catch(() => undefined);
    }
    const delay = this.ctx.createDelay(1.2);
    delay.delayTime.value = 0.22;
    const delayGain = this.ctx.createGain();
    delayGain.gain.value = 0.22;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highshelf";
    filter.frequency.value = 2400;
    filter.gain.value = 4;

    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.55;
    this.master.connect(filter);
    filter.connect(this.ctx.destination);
    this.master.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(filter);

    this.playing = true;
    this.nextLoop = this.ctx.currentTime + 0.06;
    this.scheduleAhead();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (!this.master || !this.ctx) return;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(
      muted ? 0 : 0.55,
      this.ctx.currentTime,
      0.06,
    );
  }

  get isMuted() {
    return this.muted;
  }

  get isPlaying() {
    return this.playing;
  }

  private scheduleAhead = () => {
    if (!this.ctx || !this.master || !this.playing) return;
    const horizon = this.ctx.currentTime + 1.4;
    while (this.nextLoop < horizon) {
      schedulePattern(this.ctx, this.master, this.nextLoop);
      this.nextLoop += LOOP_SECONDS;
    }
    this.timer = setTimeout(this.scheduleAhead, 400);
  };

  stop() {
    this.playing = false;
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    void this.ctx?.close().catch(() => undefined);
    this.ctx = null;
    this.master = null;
  }
}

let singleton: MusicBox | null = null;
export function getMusicBox() {
  if (!singleton) singleton = new MusicBox();
  return singleton;
}

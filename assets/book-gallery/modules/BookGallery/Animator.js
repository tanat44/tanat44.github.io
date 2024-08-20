export class Animator {
  target; // target function
  fromValue;
  toValue;
  duration; // in seconds
  time;

  constructor(fromValue, toValue, duration, target) {
    this.fromValue = fromValue;
    this.toValue = toValue;
    this.duration = duration;
    this.target = target;
    this.time = 0;
  }

  animate(deltaTime) {
    if (this.ended) return;

    this.time += deltaTime;
    const range = this.toValue - this.fromValue;
    const value = this.fromValue + (range / this.duration) * this.time;
    this.target(value);
  }

  get ended() {
    return this.time > this.duration;
  }
}

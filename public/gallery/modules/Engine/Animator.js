export class Animator {
  target; // target function
  fromValue;
  toValue;
  fromTime; // in seconds
  toTime; // in seconds
  time;

  constructor(fromValue, toValue, fromTime, toTime, target) {
    this.fromValue = fromValue;
    this.toValue = toValue;
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.target = target;
    this.time = 0;
  }

  animate(deltaTime) {
    this.time += deltaTime;
    if (this.time < this.fromTime || this.time > this.toTime) return;

    const range = this.toValue - this.fromValue;
    let value =
      this.fromValue +
      (range / (this.toTime - this.fromTime)) * (this.time - this.fromTime);
    if (this.fromValue > this.toValue && value < this.toValue)
      value = this.toValue;
    else if (this.fromValue < this.toValue && value > this.toValue)
      value = this.toValue;
    this.target(value);
  }

  get ended() {
    return this.time > this.duration;
  }
}

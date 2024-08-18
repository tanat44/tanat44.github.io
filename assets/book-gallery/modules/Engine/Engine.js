import { CtxExtension } from "./CtxExtension.js";

export class Engine {
  ctx;
  element;

  // callback
  animationCallback;
  mouseMoveCallback;

  constructor(elementId) {
    this.element = document.getElementById(elementId);

    this.initEvent();
    this.initCanvas();
  }

  addEventListener(eventName, callback) {
    this.element.addEventListener(eventName, callback);
  }

  draw() {
    this.ctx.start();

    if (this.animationCallback) this.animationCallback();

    this.ctx.end();
    window.requestAnimationFrame(() => this.draw());
  }

  get canvas() {
    return this.ctx.canvas;
  }

  initEvent() {
    // this.element.addEventListener("wheel", (e) => {
    //   console.log(e);
    //   e.preventDefault();
    // });

    this.element.addEventListener("mousemove", (e) => this.mouseMove(e));
  }

  initCanvas() {
    const _ctx = gallery.getContext("2d");
    this.ctx = new CtxExtension(_ctx);
    window.requestAnimationFrame(() => this.draw());
  }

  mouseMove(e) {
    if (!this.mouseMoveCallback) return;

    var rect = this.element.getBoundingClientRect();
    this.mouseMoveCallback({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  set animationCallback(callback) {
    this.animationCallback = callback;
  }

  set mouseMoveCallback(callback) {
    this.mouseMoveCallback = callback;
  }
}

import { CtxExtension } from "./CtxExtension.js";

export class Engine {
  ctx;
  element;
  lastTime;
  fullwindow;

  // callback
  animationCallback;
  mouseMoveCallback;
  mouseClickCallback;

  constructor(elementId, fullwindow = false) {
    this.fullwindow = fullwindow;
    this.element = document.getElementById(elementId);
    this.initEvent();
    this.initCanvas();
  }

  addEventListener(eventName, callback) {
    this.element.addEventListener(eventName, callback);
  }

  draw() {
    this.ctx.start();

    let deltaTime = 0;
    if (this.lastTime) {
      deltaTime = (window.performance.now() - this.lastTime) / 1000;
    }
    this.lastTime = window.performance.now();

    if (this.animationCallback) this.animationCallback(deltaTime);

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
    this.element.addEventListener("click", (e) => this.mouseClick(e));
    window.addEventListener("resize", (e) => this.windowResize(e));
  }

  initCanvas() {
    this.windowResize();
    const _ctx = this.element.getContext("2d");
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

  mouseClick(e) {
    if (!this.mouseClickCallback) return;

    var rect = this.element.getBoundingClientRect();
    this.mouseClickCallback({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  windowResize(e) {
    if (this.fullwindow) {
      this.element.width = window.innerWidth;
      this.element.height = window.innerHeight;
    }
  }

  set animationCallback(callback) {
    this.animationCallback = callback;
  }

  set mouseMoveCallback(callback) {
    this.mouseMoveCallback = callback;
  }

  get width() {
    return this.element.width;
  }
  get height() {
    return this.element.height;
  }
}

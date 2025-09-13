class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    console.log("emitted");

    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    console.log("emitted");

    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit(event, ...args) {
    console.log("emitted");

    if (!this.events[event]) return;

    this.events[event].forEach((callback) => callback(...args));
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;

class Queue {
  constructor() {
    this.queue = [];
  }

  add(instance) {
    this.queue.push(instance);
  }
  getFirst() {
    return this.queue.shift();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

export default Queue;

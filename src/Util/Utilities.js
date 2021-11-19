class Utilities {
  wait(time) {
    return new Promise((r) => setTimeout(r, time).unref());
  }
}
export { Utilities };

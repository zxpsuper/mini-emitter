import MiniEmitter from "../src/mini-emitter";

/**
 * Dummy test
 */
describe("test miniEmitter", () => {
  it("test on and emit", () => {
    const app = new MiniEmitter();
    let data = null;
    app.on("click", (i: any) => {
      data = i;
    });
    app.emit("click", 2);
    expect(data).toBe(2);
  });

  it("test off", async () => {
    const app = new MiniEmitter();
    app.on("click", () => {});
    app.off("click");
    expect(() => {
      app.emit("click");
    }).toThrow();
  });

  it("test once", () => {
    const app = new MiniEmitter();

    app.once("click", () => {});
    app.emit("click");

    expect(() => {
      app.emit("click");
    }).toThrow();

    let data = null,
      obj = {};
    app.once(
      "move",
      function() {
        //@ts-ignore
        data = this;
      },
      obj
    );
    app.emit("move");
    expect(data).toBe(obj);
  });

  it("test off with not exist event", () => {
    const app = new MiniEmitter();
    expect(() => {
      app.off("click1");
    }).toThrow();
  });
});

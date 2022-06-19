import { Foo } from "./__mock__/Foo";

describe("Timeout TEST", () => {
  const foo = new Foo();
  it("test", async () => {
    const result = await foo.foo();

    console.log(result);
  });
});

import { expect, test } from "bun:test";
import { slug } from "./slug";

test("slug", () => {
  expect(slug("Hello World")).toMatchInlineSnapshot(`"hello-world"`);
});

import { expect, test } from "bun:test";
import { slug } from "./slug";

test("slug", () => {
  expect(slug("Hello World")).toMatchInlineSnapshot(`"hello-world"`);
  expect(slug("  Leading and trailing  ")).toMatchInlineSnapshot(
    `"leading-and-trailing"`
  );
  expect(slug("Multiple   Spaces")).toMatchInlineSnapshot(`"multiple-spaces"`);
  expect(slug("Already-slugified")).toMatchInlineSnapshot(
    `"already-slugified"`
  );
  expect(slug("MiXeD CaSe")).toMatchInlineSnapshot(`"mixed-case"`);
  expect(slug("Special!@# $%^&*()")).toMatchInlineSnapshot(`"special-"`);
});

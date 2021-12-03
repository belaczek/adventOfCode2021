import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.102.0/path/mod.ts";
import { stage1, stage2 } from "./index.ts";

const directory = dirname(fromFileUrl(Deno.mainModule));
const data = Deno.readTextFileSync(join(directory, "./input.txt"));

const testData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

Deno.test("day-02 stage1", () => {
  assertEquals(stage1(testData), 150);
  assertEquals(stage1(data), 1383564);
});

Deno.test("day-02 stage2", () => {
  assertEquals(stage2(testData), 900);
  assertEquals(stage2(data), 1488311643);
});

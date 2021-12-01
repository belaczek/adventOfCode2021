import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.102.0/path/mod.ts";
import { stage1, stage2 } from "./index.ts";

const directory = dirname(fromFileUrl(Deno.mainModule));
const data = Deno.readTextFileSync(join(directory, "./data.txt"));

const testData = `199
200
208
210
200
207
240
269
260
263`;

Deno.test("stage1", () => {
  assertEquals(stage1(testData), 7);
  assertEquals(stage1(data), 1195);
});

Deno.test("stage2", () => {
  assertEquals(stage2(testData), 5);
  assertEquals(stage2(data), 1235);
});

import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.102.0/path/mod.ts";
import { stage1, stage2 } from "./index.ts";

const directory = dirname(fromFileUrl(Deno.mainModule));
const data = Deno.readTextFileSync(join(directory, "./input.txt"));

const testData = `16,1,2,0,4,2,7,1,2,14`;

Deno.test("day-07 stage1", () => {
  assertEquals(stage1(testData), 37);
  assertEquals(stage1(data), 355150);
});

Deno.test("day-07 stage2", () => {
  assertEquals(stage2(testData), 168);
  assertEquals(stage2(data), 98368490);
});

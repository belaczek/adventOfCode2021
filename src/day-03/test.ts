import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.102.0/path/mod.ts";
import { stage1, stage2 } from "./index.ts";

const directory = dirname(fromFileUrl(Deno.mainModule));
const data = Deno.readTextFileSync(join(directory, "./input.txt"));

const testData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

Deno.test("day-03 stage1", () => {
  assertEquals(stage1(testData), 198);
  assertEquals(stage1(data), 1307354);
});

Deno.test("day-03 stage2", () => {
  assertEquals(stage2(testData), 230);
  assertEquals(stage2(data), 482500);
});

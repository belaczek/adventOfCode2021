import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.102.0/path/mod.ts";
import { stage1, stage2 } from "./index.ts";

const directory = dirname(fromFileUrl(Deno.mainModule));
const data = Deno.readTextFileSync(join(directory, "./input.txt"));

const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`;

Deno.test("day-09 stage1", () => {
  assertEquals(stage1(testData), 15);
  assertEquals(stage1(data), 600);
});

Deno.test("day-09 stage2", () => {
  assertEquals(stage2(testData), 1134);
  assertEquals(stage2(data), 987840);
});

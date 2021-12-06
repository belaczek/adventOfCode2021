import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.102.0/path/mod.ts";
import { stage1, stage2 } from "./index.ts";

const directory = dirname(fromFileUrl(Deno.mainModule));
const data = Deno.readTextFileSync(join(directory, "./input.txt"));

const testData = `3,4,3,1,2`;

Deno.test("day-05 stage1", () => {
  assertEquals(stage1(testData), 5934);
  assertEquals(stage1(data), 391888);
});

Deno.test("day-05 stage2", () => {
  assertEquals(stage2(testData), 26984457539);
  assertEquals(stage2(data), 1754597645339);
});

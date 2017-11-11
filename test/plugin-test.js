import test from "ava";
import plugin from "../lib/plugin";

test("has plugin", t => {
  t.is(plugin(), "running...");
});

import test from "ava";
import RazorPartialViewsWebpackPlugin from "../lib/plugin";

test("defaults to emtpy ruleset", t => {
  new RazorPartialViewsWebpackPlugin();
  t.pass();
});

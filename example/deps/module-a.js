import is from "is-thirteen";

import moduleStyles from "./module-a.css";

export const a = () =>
  console.log("module a says 12 + 1 === 13", is(12 + 1).thirteen());

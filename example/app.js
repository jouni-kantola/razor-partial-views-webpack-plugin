import { foo } from "./deps/module-tree-shaking.js";
import appStyles from "./app.css";

async function bootstrap() {
  const { a } = await import("./deps/module-a.js");
  a();
}

bootstrap();

foo();

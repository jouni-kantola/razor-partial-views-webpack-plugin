import { foo } from "./deps/module-tree-shaking.js";
import "./app.css";

async function bootstrap() {
  const { a } = await import("./deps/module-a.js");
  a();
}

bootstrap();

foo();

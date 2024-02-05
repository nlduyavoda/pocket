// vite.config.ts
import path from "path";
import react from "@vitejs/plugin-react";
import { Alias, defineConfig } from "vite";

import * as tsconfig from "./tsconfig.json";

function readAliasFromTsConfig(): Alias[] {
  const pathReplaceRegex = new RegExp(/\/\*$/, "");
  const aliasConfig = Object.entries(tsconfig.compilerOptions.paths).reduce(
    (aliases, [fromPaths, toPaths]) => {
      const find = fromPaths.replace(pathReplaceRegex, "");
      const toPath = toPaths[0].replace(pathReplaceRegex, "");
      const replacement = path.resolve(__dirname, `src/${toPath}`);
      aliases.push({ find, replacement });
      return aliases;
    },
    [] as Alias[]
  );
  return aliasConfig;
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: readAliasFromTsConfig(),
  },
});

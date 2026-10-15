import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served from https://7sthunder.github.io/portfolio (project Pages site),
// so all built assets resolve under the /portfolio/ subpath.
export default defineConfig({
  base: "/portfolio/",
  plugins: [react(), tailwindcss()],
});
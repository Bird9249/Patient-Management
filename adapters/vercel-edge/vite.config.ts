import { vercelEdgeAdapter } from "@builder.io/qwik-city/adapters/vercel-edge/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.vercel-edge.tsx", "@qwik-city-plan"],
      },
      outDir: ".vercel/output/functions/_qwik-city.func",
    },
    plugins: [vercelEdgeAdapter()],
    define: {
      "process.env.POSTGRES_URL":JSON.stringify(process.env.POSTGRES_URL), 
      "process.env.BLOB_READ_WRITE_TOKEN":JSON.stringify(process.env.BLOB_READ_WRITE_TOKEN)
    }
  };
});

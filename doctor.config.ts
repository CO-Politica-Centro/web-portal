import { defineConfig } from "react-doctor/api";

/**
 * Firebase Auth client SDK ships `apiKey` + `tenantId` property names in the
 * same vendor chunk. That trips artifact-baas-authority-surface even when our
 * app keeps Firestore collection access on the server with ownership rules.
 * Ignore only built vendor chunks for that rule; keep it for our source.
 */
export default defineConfig({
  ignore: {
    overrides: [
      {
        files: [".next/static/chunks/**"],
        rules: ["react-doctor/artifact-baas-authority-surface"],
      },
    ],
  },
});

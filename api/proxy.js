import { createProxyMiddleware } from "http-proxy-middleware";

export default function proxy(req, res) {
  const proxy = createProxyMiddleware({
    target: process.env.VITE_API_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Rewrite the path if needed
    },
  });
  return proxy(req, res);
}

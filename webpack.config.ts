const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/, // duyệt các file .ts || .tsx
        exclude: /node_modules/,
        use: ["babel-loader"], // Giúp dịch code TS, React sang JS,
      },
      {
        test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@features": path.resolve(__dirname, "src/features/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@api": path.resolve(__dirname, "src/api/"),
      "@types": path.resolve(__dirname, "src/types/"),
      "@hocs": path.resolve(__dirname, "src/hocs/"),
    },
  },
  output: {
    path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
    filename: "bundle.js", // Tên file được build ra
  },
  devServer: {
    port: 3002,
  },
};

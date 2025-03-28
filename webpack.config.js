const path = require("path");

module.exports = {
    entry: "./index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "chip-8.js",
        path: path.resolve(__dirname, "public")
    },
    mode: "development"
}
const path = require("path");

module.exports = (env, args) => {
    const isProd = args.mode == "production";
    return {
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
            library: {
                name: "chip-8-ts",
                type: "umd",
                export: "default"
            },
            globalObject: "this",
            filename: "chip-8.js",
            path: path.resolve(__dirname, "public")
        },
        devtool: isProd ? "source-map" : "eval-source-map",
        mode: args.mode,
        optimization: {
            minimize: false,
        }
    }
}
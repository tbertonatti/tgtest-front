const env = process.env.NODE_ENV || "development";
const config = require("./src/config/config.json")[env];
module.exports = {
    devServer: {
        proxy: {
            "^/api": {
                pathRewrite: {
                    "^/api": "",
                },
                target: `${config.host}:${config.port}`,
                ws: true,
                changeOrigin: true,
            },
        },
    },
};

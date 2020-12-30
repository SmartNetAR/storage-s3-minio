module.exports = {
    apps : [{
        name: "node-experience",
        script: "./src/index.js",
        error_file: "./src/logs/err.log",
        watch: true,
        instances: 1,
        ignore_watch: './src/logs/*',
        instance_var: "0",
        env: {
            NODE_ENV: "production",
            NODE_CONFIG_STRICT_MODE: true
        }
    }]
}
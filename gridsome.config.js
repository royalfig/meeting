// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/scss/globals.scss")]
    });
}

module.exports = {
  siteName: "History of Science Society",
  siteUrl: "https://hssmeeting.org",

  plugins: [
    {
      use: "@gridsome/plugin-sitemap"
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: process.env.GA_ID ? process.env.GA_ID : "UA-5101015-3"
      }
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000
      }
    },
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Doc", // Required
        baseDir: "./docs", // Where .md files are located
        template: "./src/templates/Doc.vue" // Optional
      }
    }
  ],
  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  }
};

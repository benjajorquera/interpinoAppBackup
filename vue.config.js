const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        extraFiles: [
          "db.sqlite3"
        ],
        win: {
          icon: './icon.ico'
        }
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:3000'
  },
  transpileDependencies: [
    'vuetify'
  ]
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/svg-sprite',
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  svgSprite: {
    // manipulate module options
  }
})

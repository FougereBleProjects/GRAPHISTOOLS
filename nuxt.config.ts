// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  app: {
    head: {
      title: "Graphistools",
      meta: [{ charset: "utf-8" }],
    },
    baseURL: "fougerebleprojects.github.io",
  },
});

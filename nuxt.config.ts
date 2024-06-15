// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  generate: {
    fallback: "404.html",
  },
  app: {
    head: {
      title: "Graphistools",
      meta: [{ charset: "utf-8" }],
    },
    baseURL: "/graphistools/",
  },
});

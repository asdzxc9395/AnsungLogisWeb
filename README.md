## 명령어

```bash
# npm
npm install
npm run dev
npm run build
npm run preview
```

## tailwind, nuxtui clas 정리
https://nerdcave.com/tailwind-cheat-sheet

{
  "name": "nuxt-app",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "devDependencies": {
    "@nuxt/devtools": "latest",
    "@nuxtjs/eslint-config-typescript": "^12.1.0",
    "@nuxtjs/eslint-module": "^4.1.0",
    "nuxt": "^3.8.2",
    "typescript": "^5.3.2",
    "vue": "^3.3.8",
    "vue-router": "^4.2.5"
  },
  "dependencies": {
    "@headlessui/vue": "^1.7.16",
    "@heroicons/vue": "^2.0.18",
    "@nuxt/ui": "^2.11.0"
  }
}

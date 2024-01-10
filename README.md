## 명령어

```bash
# npm
npm install
npm run dev
npm run build
npm run preview
```

## version

node : 20.5.0
npm : 9.8.0

```JSON
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
    "@nuxt/ui": "^2.11.0",
    "@headlessui/vue": "^1.7.16",
    "@heroicons/vue": "^2.0.18",
    "@pinia/nuxt": "^0.5.1",
    "vue-chartjs": "^5.3.0",
    "pinia": "^2.1.7",
    "chart.js": "^4.4.1",

    "nuxt-icon": "^0.5.0",
    
    "@nuxt/content": "^2.8.2",
    "@nuxt/image": "^1.1.0",
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "@tailwindcss/forms": "^0.5.6",
    "axios": "^1.5.0",
    "crypto-js": "^4.1.1",
    "oauth-pkce": "^0.0.6",
    "uuid": "^9.0.0"
  }
}
```
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
        fontFamily: {
          sans: ['NanumSquare', ...defaultTheme.fontFamily.sans]
        },
        // colors: {
        //   green: {
        //     50: '#EFFDF5',
        //     100: '#D9FBE8',
        //     200: '#B3F5D1',
        //     300: '#75EDAE',
        //     400: '#00DC82',
        //     500: '#00C16A',
        //     600: '#00A155',
        //     700: '#007F45',
        //     800: '#016538',
        //     900: '#0A5331',
        //     950: '#052e16'
        //   }
        // }        
      }
  }
}
// module.exports = {
//     // darkMode: 'class',
//     // theme: {
//     //   extend: {
//     //     screens: {
//     //       'mobile': '320px',
//     //       'tablet': '640px',
//     //     },
//     //   },
//     // },
//     // content: [
//     //     "./components/**/*.{js,vue,ts}",
//     //     "./layouts/**/*.vue",
//     //     "./pages/**/*.vue",
//     //     "./*.vue",
//     //     "./plugins/**/*.{js,ts}",
//     //     "./nuxt.config.{js,ts}",
//     // ],
//     // theme: {
//     //     extend: {
//     //         colors: {
//     //             transparent: 'transparent',
//     //             current: 'currentColor',
//     //             white: colors.white,
//     //             gray: colors.slate,
//     //             primary: colors.teal,
//     //             secondary: colors.sky,
//     //             success: colors.green,
//     //             info: colors.purple,
//     //             warning: colors.yellow,
//     //             danger: colors.red,
//     //             "vtd-primary": colors.teal, // Light mode Datepicker color
//     //             "vtd-secondary": colors.slate, // Dark mode Datepicker color
//     //         }
//     //     },
//     // },
//     // variants: {
//     //     extend: {},
//     // },

//   };
  
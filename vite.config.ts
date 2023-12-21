import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"
import Unfonts from 'unplugin-fonts/vite'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    Unfonts({
      custom: {
        /**
         * Fonts families lists
         */
        families: [{
          /**
           * Name of the font family.
           */
          name: 'BeaufortforLOL',
          /**
           * Local name of the font. Used to add `src: local()` to `@font-rule`.
           */
          local: 'BeaufortforLOL',
          /**
           * Regex(es) of font files to import. The names of the files will
           * predicate the `font-style` and `font-weight` values of the `@font-rule`'s.
           */
          src: './src/assets/fonts/BeaufortforLOL/*.ttf',
          transform: (font) => {
            switch (font.basename) {
              case 'BeaufortforLOL-Regular':
                font.weight = 400
                font.style = 'normal'
                return font
              case 'BeaufortforLOL-Italic':
                font.weight = 400
                font.style = 'italic'
                return font
              case 'BeaufortforLOL-Light':
                font.weight = 300
                font.style = 'normal'
                return font
              case 'BeaufortforLOL-LightItalic':
                font.weight = 300
                font.style = 'italic'
                return font
              case 'BeaufortforLOL-Medium':
                font.weight = 500
                font.style = 'normal'
                return font
              case 'BeaufortforLOL-MediumItalic':
                font.weight = 500
                font.style = 'italic'
                return font
              case 'BeaufortforLOL-Bold':
                font.weight = 700
                font.style = 'normal'
                return font
              case 'BeaufortforLOL-BoldItalic':
                font.weight = 700
                font.style = 'italic'
                return font
              case 'BeaufortforLOL-Heavy':
                font.weight = 900
                font.style = 'normal'
                return font
              case 'BeaufortforLOL-HeavyItalic':
                font.weight = 900
                font.style = 'italic'
                return font
              default:
                return font;
            }
          }
        }]
      },
    }),
    react()
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

}));

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
      indent: ["error", 4],  // ตรวจสอบการ indent ที่ 2 ช่อง
      "react/react-in-jsx-scope": "off" // ปิด warning ของ react scope ในไฟล์ JSX
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
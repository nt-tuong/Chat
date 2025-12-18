import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
// import prettier from 'eslint-config-prettier';
import interfacePropsNaming from "./eslint/rules/interface-props-naming.mjs";
import typePropsNaming from "./eslint/rules/type-props-naming.mjs";
import noConsoleExceptCatch from "./eslint/rules/no-console-except-catch.mjs";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // --- Base global setup ---
  {
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Check only `src` folder
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
  },

  // --- Default ESLint configuration for JavaScript ---
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    ...pluginJs.configs.recommended,

    // rules: {
    //   ...pluginJs.configs.recommended.rules,
    // },
  },

  // --- React (JS) config ---
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // --- TypeScript config ---
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,

      // To avoid errors, remove the line if not using tsconfig.json.
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      react: pluginReact,
      // Declare custom rules plugin
      "custom-rules": {
        rules: {
          "interface-props-naming": interfacePropsNaming,
          "type-props-naming": typePropsNaming,
        },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "jsx-quotes": ["error", "prefer-single"], // Force JSX (React) to use single quotes (paragraph html)
      "custom-rules/interface-props-naming": "error", // Enforce interface props naming convention I{ComponentName}Props
      "custom-rules/type-props-naming": "error", // Enforce type props naming convention T{ComponentName}Props
      // 'custom-rules/no-console-except-catch': 'warn',
    },
  },

  // --- React (TSX/JSX) config ---
  {
    files: ["src/**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  // --- General rules ---
  {
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "@typescript-eslint": tsEslint,
      "custom-rules-v2": {
        rules: {
          "no-console-except-catch": noConsoleExceptCatch,
        },
      },
    },
    rules: {
      // 'no-console': 'warn',
      "custom-rules-v2/no-console-except-catch": "warn",
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      quotes: ["error", "single"],
      "max-len": ["error", { code: 150 }],
      "prefer-const": "error",
      "linebreak-style": ["error", "unix"],
      eqeqeq: ["error", "always"],

      // ------------------ MAGIC NUMBERS ------------------
      "no-magic-numbers": "off",
      "@typescript-eslint/no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1],
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true, // allow readonly in class
          enforceConst: true, // require const when out of class
          ignoreArrayIndexes: true,
          detectObjects: false,
        },
      ],
      // ------------------  MAGIC NUMBERS ------------------

      "no-implicit-globals": "error",
      "no-invalid-this": "error",
      "consistent-return": "error",

      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["warn"],

      "array-callback-return": "error",
      complexity: ["warn", { max: 200 }],
      "max-lines": [
        "warn",
        { max: 3000, skipBlankLines: true, skipComments: true },
      ],
      curly: "error",
      "default-case": "warn",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message:
            "for..in loops iterate over properties, which can be surprising. Use Object.{keys,values,entries} instead.",
        },
        {
          selector: "LabeledStatement",
          message: "Labels are superfluous and can be confusing.",
        },
      ],

      // A blank line between functions is required
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "function", next: "*" }, // Between functions
        { blankLine: "always", prev: "*", next: "return" }, // Before return
        { blankLine: "always", prev: "*", next: "export" }, // Before export
      ],
      "eol-last": ["error", "always"], // Make sure the file always has a blank line at the end

      // Rule code style
      indent: "off", // turn off rules default
      "@typescript-eslint/indent": [
        "error",
        2,
        {
          SwitchCase: 1, // `case` in switch is indented 1 level compared to `switch`
          StaticBlock: { body: 1 }, // Content in `static {}` is indented 1 level
          ArrayExpression: 1, // Elements in array are indented 1 level
          flatTernaryExpressions: false, // Do not ignore indent rules in ternary expressions
          offsetTernaryExpressions: true,
          VariableDeclarator: { var: 2, let: 2, const: 3 }, // If there are multiple variables declared at the same time, the first variable determines the indent level

          // New rules
          outerIIFEBody: 1, // nội dung trong IIFE thụt vào 1 bậc
          MemberExpression: 1, // khi xuống dòng sau dấu chấm (obj.prop)
          FunctionDeclaration: { body: 1, parameters: "first" },
          FunctionExpression: { body: 1, parameters: "first" },
          CallExpression: { arguments: 1 }, // đối số khi xuống dòng
          ObjectExpression: 1, // key-value trong object thụt 1
          ImportDeclaration: 1, // import nhiều dòng thụt 1
          ignoreComments: false, // vẫn kiểm tra indent của comment
          ignoredNodes: [
            "TSTypeParameterInstantiation",
            "FunctionExpression > .params[decorators.length > 0]",
            "TSUnionType",
            "TSTypeAnnotation",
            "ConditionalExpression",
          ],
        },
      ],
      "space-infix-ops": "error", // Space required between operators
      "space-in-parens": ["error", "never"], // Do not leave spaces in parentheses
      "space-before-blocks": ["error", "always"], // Space required before `{`
      "keyword-spacing": ["error", { before: true, after: true }], // Space after switch, case,if, else, for, while
      "brace-style": ["error", "1tbs", { allowSingleLine: false }], // Line break of `{ }`
      "padded-blocks": ["error", "never"], // Do not add extra blank lines in the block
      "no-multi-spaces": ["error"], // Do not leave multiple consecutive spaces
    },
  },

  // // Prevent Prettier from overriding ESLint
  // {
  //   files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  //   rules: {
  //     ...prettier.rules, // Prevent Prettier from overriding ESLint rules
  //   },
  // },
];

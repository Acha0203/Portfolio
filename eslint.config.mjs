import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([globalIgnores([
    "**/node_modules/",
    "**/.next/",
    "**/.nuxt/",
    "**/build/",
    "**/dist/",
    "**/out/",
    "**/public/",
    "**/package-lock.json",
    "**/vite.config.ts",
    "**/next.config.js",
    "**/tsconfig.json",
    "**/postcss.config.js",
    "**/eslint.config.mjs",
    "**/next-env.d.ts",
]), nextCoreWebVitals, nextTypescript, prettier, {
    plugins: {
        "unused-imports": unusedImports,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },
    },

    rules: {
        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: "*",
            next: "return",
        }, {
            blankLine: "any",
            prev: "singleline-const",
            next: "return",
        }],

        "unused-imports/no-unused-imports": "error",

        "unused-imports/no-unused-vars": ["warn", {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
        }],

        "jsx-a11y/no-autofocus": "off",

        "import/extensions": ["error", {
            ignorePackages: true,

            pattern: {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        }],

        "import/newline-after-import": "error",

        "import/order": ["error", {
            groups: [
                "type",
                "builtin",
                "external",
                "internal",
                ["parent", "sibling"],
                "object",
                "index",
            ],

            pathGroups: [{
                pattern: "#/types/**",
                group: "type",
                position: "after",
            }, {
                pattern: "{#/**}",
                group: "internal",
                position: "before",
            }, {
                pattern: "{[A-Z]*,**/[A-Z]*}",
                group: "internal",
                position: "after",
            }, {
                pattern: "@@/**",
                group: "index",
                position: "after",
            }],

            "newlines-between": "never",
            pathGroupsExcludedImportTypes: ["builtin"],

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],

        "react/display-name": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",

        "react/self-closing-comp": ["error", {
            component: true,
            html: false,
        }],

        "@next/next/no-img-element": "off",
        "react-hooks/set-state-in-effect": "off",
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
        parserOptions: {
            tsconfigRootDir: __dirname,
            project: ["./tsconfig.json"],
        },
    },

    rules: {
        "@typescript-eslint/consistent-type-imports": ["error", {
            fixStyle: "separate-type-imports",
        }],

        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",

        "@typescript-eslint/no-misused-promises": ["error", {
            checksVoidReturn: false,
        }],

        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-unused-vars": "off",

        "@typescript-eslint/strict-boolean-expressions": ["error", {
            allowString: true,
            allowNumber: true,
            allowNullableString: true,
            allowNullableNumber: true,
            allowNullableObject: true,
        }],

        "@typescript-eslint/triple-slash-reference": ["error", {
            types: "always",
        }],

        "react/prop-types": "off",

        "react/no-unknown-property": ["error", {
            ignore: ["css"],
        }],
    },
}]);

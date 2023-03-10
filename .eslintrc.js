module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "arrowParens": "avoid",
        "semi": false,
        "trailingComma": "none",
        "endOfline" : "lf",
        "tabWidth": false,
        "singleQuote": true,
        "printWidth": 120,
        "jsxSingleQuote": false
    }
}

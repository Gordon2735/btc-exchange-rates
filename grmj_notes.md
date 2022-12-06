# **TypeScript Sandbox for Webelistics, LLC Development & Practice**

<br/>

## NPM Installs

---

    - npm i -D open
    - npm i typescript
    - npm install --save-dev @tsconfig/node16
    - npm i gitignore node
    - npm install --save-dev @types/node
    - npm install --save-dev @types/express @types/morgan
    - npm install ts-node --save-dev
    - npm install eslint --save-dev
    - npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
    - npm install --save-dev prettier
    - npm install --save-dev eslint-config-prettier eslint-plugin-prettier

<br/>

## Initial Commands

    - npm install --save-dev @tsconfig/node16
    - npx tsc --version
    - npx tsc --init
    - npx tsc

    - You can fix this error in two ways. Either you add a .ts file in your src directory, or you specify the allowJs compiler option so that the TypeScript compiler also recognizes JavaScript files. We will use the latter option as it can be used to convert a JavaScript project to TypeScript incrementally. We also need to specify the outDir option, which specifies a path relative to the tsconfig.json file where the compilation output will be placed.

    - npx tsc --watch
    - npm install ts-node --save-dev
    - npx ts-node src/server.js
    - npx ts-node src/server.ts
    - npx prettier --write src/server.ts

<br/>

## INLINE CODE

    `inline code`

```ts

    {
        "extends": "@tsconfig/node16/tsconfig.json",
        "compilerOptions": {
        "allowJs": true,
        "outDir": "dist"
    },
        "include": ["src/**/*"],
        "exclude": ["node_modules"]
    }

```

<br/>

## DeBug with Chrome

    - node -r ts-node/register --inspect src/server.ts

<br/>

## DeBug with VS Code

    - F5

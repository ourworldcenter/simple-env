<img src="./icon.png" alt="icon" width="70">

# Simple Env

A simple environment variable loader for Node.js.

## Installation

NPM

```bash
npm install @ourworld/simple-env
```

Yarn

```bash
yarn add @ourworld/simple-env
```

## Usage

All you need to do is import it.

```js
import "@ourworld/simple-env";
```

Now, you can use `.env` in your project just as you would expect.

```bash
# .env
HELLO="Hello World!"
...
```

```js
// main.js
console.log(process.env.HELLO);
...
```

The default path for `.env` is the project `root`. If you want to change it, you can use the `path` option as below.

## Config

```js
import { SimpleEnv } from "@ourworld/simple-env";

new SimpleEnv({
  path: "path/to/your/.env",
})

// and ready to use
```

## 🧑‍💻 Other Apps

Check out:

- [Our World](https://ourworld.center/apps) (Official Website)

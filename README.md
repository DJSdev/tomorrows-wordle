# Know all the Wordles

## Website

[Github Pages site for figuring out what the word of the day is](https://djsdev.github.io/tomorrows-wordle/)

## As a Library
```
// Today
node solve-wordle.js
> ultra
```

or to solve for a different date

```
// Tomorrow
node solve-wordle.js 2/13/2022
> robin
```

![solve-wordle.js](./assets/nodesolvewordle.gif)

## Build Docs

`PUBLIC_URL=./  BUILD_PATH='../../docs' npm run build`
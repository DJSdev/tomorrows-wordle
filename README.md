# Know all the Wordles

## Website

📝 Tomorrow's  wordle - https://djsdev.github.io/tomorrows-wordle/

## Build

🏦 `npm run build`

## CLI
```
// Today
node solve-wordle.js
> ultra

// Tomorrow
node solve-wordle.js 2/13/2022
> robin
```

![solve-wordle.js](./assets/nodesolvewordle.gif)

# Interesting Commit

https://github.com/DJSdev/tomorrows-wordle/commit/7b9f9dde525b9a0ab76a039e6eb2a0d35c0e3cd0

This commit is interesting. When NYT removed the word `fetus` from the word list it wasn't actually removed, it was simply moved to the bottom of the word list along with many other "problematic" words. Some of which don't seem problematic.

Interesting, the NYT only went as far as changing "problematic" words up to November 23, 2022 if my calculation is correct.
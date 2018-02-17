# Generative

https://edwardscam.github.io/generative/

Messing around with generative algorithms. See examples folder for demos.
Select a pattern and hit draw! You can tweak parameters as you go.

---

## Patterns

### Infinity Cycle
This is a mutant sinusoid that animates as it draws. You can modify the phase, rotation speed, and several other parameters.

### Roots
This algorithm attemps to re-create the behavior of tree branches or roots. At each branch, it makes partially-random decisions about where to draw the next line (but also partially dependent on the parameters you set). There is a "decay" factor, which affects the width, length, and flexibility of a branch. So as you get further from the root, your branches get shorter but they can bend more. Branches will attempt to fill in the entire boundary, but will also try very hard to not intersect with other branches.

### Chipboard
This one takes a square, and attempts to fill in that square by chopping it into quarters and recursively repeating this process on each sub-square (until it reaches a minimum size, which you can modify). There's an element of randomness as to how it chops up each square, which you can also modify. The end result is it kind of looks like a big ol' motherboard.

---

## Local setup

* `npm install`
* `npm run start`
* open `http://localhost:8080/`

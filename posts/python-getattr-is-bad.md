---
title: '"getattr" is bad'
description: "A plea for Python developers to stop using getattr so often"
date: "2025-06-15"
tags: ["Programming", "Python"]
---

Stop using `getattr()` so much.

The [Zen of Python](https://en.wikipedia.org/wiki/Zen_of_Python) states as one of its axioms:

> There should be one - and preferably only one - obvious way to do it.

Despite that, if you want to access the attribute of an object, there are two ways to do it:

```python
human = Human()

# The normal way
human.brain

# and the getattr way
getattr(human, "brain")
```

Unless you _truly_ have a good reason, you should always use the first way.

## Why?

A [couple](https://jugmac00.github.io/blog/getattr-considered-harmful/) [other](https://hynek.me/articles/hasattr/) [people](https://frostyx.fedorapeople.org/The-Little-Book-of-Python-Anti-Patterns-1.0.pdf) have written about the different ways that using `getattr` has shot them in the foot. Their main points were:

- It ruins coverage reporting for your tests.
- It doesn't find methods decorated with `@property`.
- Dynamically creating attributes is gross and confusing.

I'd like to add my own experience to this list, and build on it:

- In large codebases, you often change variable names using an IDE 'rename' command, which finds all references to the attribute and changes them across all files in one go. This won't change names accessed via `getattr`.
- It goes against the Zen of Python.
- It makes it impossible to jump to the definiton of the attribute via hotkey. (F12 in VSCode).
- It makes refactoring _incredibly hard_ and dramatically increases complexity.

I mean, take a look at this example:

```python
def foo(obj: Human, methods: list[str]) -> None:
    for method in methods:
        getattr(obj, method)()
```

What methods are you calling on `obj`? You literally have no way of knowing without context about the whole application.

## What's the fix?

Do this instead:

```python
try:
    print(a.b)
except AttributeError:
    print("oh snap, 'b' doesn't exist!")
```

## Why is this in the language in the first place?

Python is a dynamic programming language, and one of the reasons it's so powerful is because you can do some really cursed things with it. I want my programming language of choice to be strong and flexible enough to do _anything_. Does that mean I personally _want_ to do those things? No - but I want the option available in case I do.

`getattr` is an "escape hatch" from sensible nice Python, just in case you **need** to do something whacky. Maybe to interface with a whacky library. Maybe there truely is a usecase that `getattr` and `setattr` lend themselves to.

Just because this escape hatch exists, it doesn't mean you should use it.

Using `getattr` is almost always a code smell. It's usually a sign that you're using dynamic trickery instead of solid, explicit design.

---
title: "'Data' sucks"
description: "The most consistently bad variable name."
date: "2025-03-23"
tags: ['Programming']
---

One of the [two hard things](https://martinfowler.com/bliki/TwoHardThings.html) about programming is naming things, and as programmers we spend a fair bit of time thinking about what we name different 'things'. Having a consistently good naming scheme across a large codebase can significantly speed up development, and having confusing names will slow it down.

![A programmer looking at the words "specific object" and asking the question: "Is this data"?](/images/blog/data-sucks/meme_1.png)

Let's say the "badness" of a variable name is: "how badly named something is" multiplied by "how often you see the bad name". I think the worst variable name in all of programming is the word "data".

Why it sucks:

* It doesn't mean anything. Everything is data.
* I guarantee you can think of a better name. You're being lazy.
* It is an _invariable noun_. Like the word "sheep", it could mean one sheep, or many sheep. (Some might argue that the singular is "datum" but that's pretty uncommon). So you can't even reason about whether the "data" is iterable or not.

If I run the query "`(data, language:Python`" in GitHub across all public repos, we can look at some nice Python examples of functions where "data" is the first arg. Here is the first example:

```python
def imgcat(data, lines=-1):
```

See what I mean? What is data? What type is it? What does the function do? 🤷

Since Python has type hints, and everyone who endeavors to actually write good Python should be using them, let's do ourselves a favour and change our search to "`(data: language:Python`" so it only finds _typed_ examples.

```python
async def stream_offline(data: dict):
```

What's data? I mean, it's a dictionary, but since it's only half typed, and not something strict like a `dict[str, int]` or something, once again, it could technically be anything.

Or this great example!

```python
def calc_zscore(data: np.ndarray) -> np.ndarray:
    """
    计算数据的z分数。
```

Nice, "data" is actually a numpy array! A strict type! However, `np.ndarray`s are actually quite spicy multi-dimensional containers, so you usually want to specify what sort of data array you're expecting unless a "z-score" is something that applies to all `ndarrays` regardless of size and dimensionality. What does this function do anyway? Let's translate the comment using ChatGPT:

![A translation of the phrase "计算数据的z分数。" which just means "calculate the z-score".](/images/blog/data-sucks/zscore.png)

I don't know what I expected.

Let's say we have a great example like the following.

```python
from dataclasses import dataclass

@dataclass
class JohnsSpecialObject:
    bing: int
    bong: str

def do_something(data: JohnsSpecialObject) -> None:
    pass
```

Now we know exactly what data is! In this case though, wouldn't it make more sense to write:


```python
def do_something(johns_special_object: JohnsSpecialObject) -> None:
    pass
```

instead of calling it "data"?

---

If I find myself ever using the word "data" in code, I do some more thinking and come up with a better name. Please for everyone's sake, you should do the same.
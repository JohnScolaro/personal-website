---
title: "Self Referential Type Hints with | in Python"
description: "Exploring a quirk of Python's type hinting with the pipe operator"
date: "2024-10-14"
tags: ['Programming']
---

I ran into an interesting quirk lately with Python 3.12. Let's take a classic binary tree node class implementation. You would **think** this would work, but it actually doesn't:

```python
import dataclasses

@dataclasses.dataclass
class Node:
    value: float
    left: "Node" | None
    right: "Node" | None
```

If I run this, I receive this error:

```txt
  File "C:\Users\me\blah\test.py", line 20, in Node
    left: "Node" | None
          ~~~~~~~^~~~~~
TypeError: unsupported operand type(s) for |: 'str' and 'NoneType'
```

This is interesting because since Python 3.10, [PEP 604](https://peps.python.org/pep-0604/) has been implemented, which means that union types can be written as `X | Y` instead of `Union[X, Y]`. Also, [the python typing docs](https://docs.python.org/3/library/typing.html) literally say:

> Union type; `Union[X, Y]` is equivalent to `X | Y` and means either X or Y.
>
> To define a union, use e.g. `Union[int, str]` or the shorthand `int | str`. Using that shorthand is recommended.

But we can see that for self-referential types, that's clearly not the case. Neither the PEP, nor the docs mention anything about self-referential types, and their support, so it was interesting to run into this error where type hints with `|` don't work with self referential types which need quotes around them.

## The Fix

Before Python 3.10, you'd add self-referential type hints in either one of these two ways:

```python
import dataclasses
from typing import Optional, Union

@dataclasses.dataclass
class Node:
    value: float
    left: Optional["Node"] # <- Option 1
    right: Union["Node", None] # <- Option 2
```

These two methods still work.

## An Interesting Aside

To go further down the rabbit hole, if you _really_ _really_ want to use the `X | Y` syntax, in Python 3.11 the `Self` type was added ([docs](https://docs.python.org/3/library/typing.html#typing.Self)) and you can use it like this:

```python
import dataclasses
from typing import Self

@dataclasses.dataclass
class Node:
    value: float
    left: Self | None
    right: Self | None
```

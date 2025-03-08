---
title: "Dynamically Specifying Dependencies in Python with Setuptools and pyproject.toml"
description: "Using setuptools to specify project metadata in pyproject.toml, but dependencies in python"
date: "2024-09-22"
tags: ['Programming']
---

The Python packaging ecosystem is transitioning to using `pyproject.toml` as the standard for specifying project metadata, replacing older approaches like `setup.py` files. While this simplifies many aspects of packaging, it poses challenges when you need dynamic logic to figure out your build parameters, such as environment-specific dependencies.

Let's say you currently specify the dependencies to your package like this:

```python
from setuptools import setup
import os

TOKEN = os.getenv('TOKEN')

if TOKEN:
    dependency = f"git+https://${TOKEN}@github.com/user/example_project.git"
else:
    dependency = f"git+https://github.com/user/example_project.git"

setup(
    ...,
    install_requires=[dependency],
    ...,
)
```

If you're looking to move to a `pyproject.toml` file, you might be annoyed that the `pyproject.toml` is a simple static file, so you can't have that fancy logic you had before. This is one way I managed to use setuptools to specify my projects metadata in the `pyproject.toml`, but still retain the ability to specify the package dependencies in a Python file.

## pyproject.toml:

Specify the project dependencies to be dynamic like so:

```toml
[build-system]
requires = [setuptools >= 64]
build-backend = "setuptools.build_meta"

[project]
name = "my_project"
...
dynamic = ["dependencies"]
```

You can read about this [in the setuptools documentation](https://setuptools.pypa.io/en/latest/userguide/pyproject_config.html), but I didn't find that to be particularly clear. My take is that if something is specified as dynamic, it's required to be specified by the build system however it chooses, rather than simply read from the `pyproject.toml`. If you use setuptools as your build system, then it will look for a `setup.py` file to figure out what the parameter (in this case, the dependencies) are supposed to be. You can then have a very minimal `setup.py` which specifies _only_ the metadata fields you specified as dynamic.

## setup.py:

```python
from setuptools import setup
import random

# Whatever whacky logic you want!
if random.choice([True, False]):
    dependency = 'package_a'
else:
    dependency = 'package_b'

setup(install_requires=[dependency])
```

If you've stumbled upon this and it's helped you, or you think it's completely wrong, feel free to email me about it. I'm not claiming this is the 'best practice' project setup, but it did solve a problem for me in a very constrained corporate software environment.

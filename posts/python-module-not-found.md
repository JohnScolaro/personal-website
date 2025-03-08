---
title: "Python Import Error when in Editable Mode"
description: "Fixing a Python bug caused by some interesting pip behaviour"
date: "2024-04-11"
tags: ['Programming']
---

## Summary

Are you working on a Python project, and using code from another package? Did you decide to install that package in editable mode (sometimes called development mode) yourself, and now suddenly you're getting classic import errors that look something like this:

```
ImportError: cannot import name 'my_function' from 'my_package.my_module' (unknown location)
```

or:

```
ModuleNotFoundError: No module named 'my_package.my_module'
```

Now, you're no schmuck. You know it's not something obvious like: [Oh no, I've forgotten an `__init__.py` file somewhere!](https://stackoverflow.com/questions/57695694/pip-install-editable-package-produces-modulenotfounderror) and you're positive the package is laid out correct. It may even work in editable mode for other people!

Now ask yourself this: "Does the package save files relative to itself?" A cache perhaps? Does it write to locations relative to `__file__`?

If so, that can break how pip seems to manage uninstalling and finding your package and cause this problem.

To see if this is the problem, check your virtual environment (hopefully you're using one, if you're not you probably have larger problems) in `.venv\Lib\site-packages` and see what's in there. If you've installed normally, you can expect to see two directories pertaining to your package, something like:

- my_package
- my_package-1.0.0.dist-info

If you've installed editably, you should see ONLY the:

- my_package-1.0.0.dist-info

directory. If you're seeing both, even though you've installed editably, check the contents of the `my_package` directory, to see what's in it. Likely the only remaining files are the files that have been created. If you delete this `my_package` directory, then importing code from your package should work.

## Why does this happen?

When you install a package normally, it puts all it's contents in `site-packages`. When you install editably, pip always uninstalls the package, and then installs it in editable mode. When pip uninstalls a package, it individually removes all files in the package from the package directory in site-packages. This means that any files NOT in the module, that have since been created, and the directories they sit in, will remain.

Now, when you import a packages with something like `from my_package.my_module import x` python seems to first look for the package in site-packages. If it can't find that, then it realises that the package has been installed editably and uses the code in the editable location.

So in combination, if you create files in the package directory when the package is installed regularly, when you switch the editable mode, the package isn't correctly uninstalled, and the mostly empty "package" is found, and then python is all like:

![The "bugs bunny saying no" meme, but the no has been replaced with the text: "ModuleNotFoundError".](/images/blog/python-module-not-found/meme.png)

## Whats the proper solution?

Stop saving files in the dang package. Use something like the [platformdirs](https://pypi.org/project/platformdirs/) module to get more sensible locations to store your files in a more cross-platform way, and save the files in there. Save them ANYWHERE else! Just not in the package.

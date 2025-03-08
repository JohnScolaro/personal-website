---
title: "Changing Python Version on Windows with no Admin Privileges"
description: "How to install Python - The eternal question"
date: "2023-11-27"
tags: ['Programming']
---

## Summary

Use a virtual environment. This puts the Python you _do_ want on the path! It has the added benefit of being a virtual env, so you can blow it away whenever you need and it keeps your dependencies tidy. If you REALLY want a specific Python version on the path without activating the venv, then you can modify the path in your `.bashrc`.

## Long Story

Recently, I had the privilege of setting up a Python development environment at a new job. It's a slightly more corporate environment than I'm used to, and I immediately ran into an interesting snag that I'd never hit before. I've installed Python hundreds of times, in a variety of different configurations, so it's always such a _pleasure_ when you run into something new.

![Homer Simpson in bed looking mad captioned: "MFW Python not behaving as I expect"](/images/blog/python-no-admin-privileges/python_not_behaving.png)

Here is what I did:

1. I install the required version of Python (3.8) from the website. Naturally, the most up-to-date version is old enough that it no longer has Windows binary installers bundled with it, so I found the most recent patch that does. I've got shit to do, so I'm not going to install Python from source. Since I don't have administrator access on my Windows PC (thanks IT, love your work), I need to untick "Install launcher for all users" because that will ask for admin credentials as it attempts to install Python somewhere like: `C:\Python38`. Instead, installing as a user places it somewhere like: `C:\User\john\AppData\Local\Programs\Python\Python38\python.exe`. I tick "Add to Path" because obviously I want to be able to type `python` in order to use it. This is what the install window should look like (By default the top box is ticked and the bottom one isnt, so you need to do this manually).

![The python installer window with "install for all users" unticked, and "add Python to path" ticked](/images/blog/python-no-admin-privileges/python_install_wizard.png)

2. I type `python` into my Git Bash terminal expecting the usual greeting from Python 3.8. What do I get instead? `Python 3.7.4 (tags/v3.7.4:e09359112e, Jul  8 2019, 20:34:20) etc etc etc...`

Alright, what's going on here? This is Python 3.7, not 3.8! Immediately, I have a sniff around the environment variables because my Python command is finding the incorrect Python version. My path contains **two** Python versions, with Python 3.7 infront of 3.8? So clearly a version of Python 3.7 has been installed by someone else for all users, and placed on the system path. But my python38 on the User path should override that, right? WRONG!

As explained [here](https://superuser.com/questions/867728/user-vs-system-environment-variables-do-system-variables-override-user-variabl), user variables take precedence over system variables UNLESS it's the path variable, in which case **the user path is appended to the system path**. That's right, the user environment variables take precedence **unless** it's specifically this one. This means that even though Python 3.8 is on the path, your computer will still find Python 3.7 first and run it instead.

Luckily, when virtual environments run, they add the specific version of Python in the virtual environment to the start of the path. On top of this, all modern IDE's support selecting a virtual environment and running code, debugging and most other things all work out of the box. So set that up with `/c/Users/your-really-long-path-to-get-python-3.8/python -m venv .venv` or something, and then activate it with `source .venv/Scripts/activate`.

The only problem remaining is that for debugging reasons, and quick tests, I often like to just open the terminal and type something like:

```
python()

>>> 1+2
3

>>> exit()
```

to confirm simple maths, or check syntax as I'm writing code. It would be really helpful if this was also the correct Python version, even if the terminal hasn't activated the virtual environment. To fix this, I just added the following into my `.bashrc` so that when a terminal is opened, the path is automatically modified to add Python 3.8 to the front of the path! (even though it's already at the end, what really matters is that it's placed before the Python 3.7 location):

```
PATH="/c/Users/john/AppData/Local/Programs/Python/Python38/Scripts/:$PATH"
PATH="/c/Users/john/AppData/Local/Programs/Python/Python38/:$PATH"
```

And now it's fixed for good, and I can get on with actual work!

![An image of a guy standing on a rake, and it hitting him on the head, captioned: "setting Python up as a junior dev", and a guy kickflipping a rake down some stairs only to step on it and get hit in the head captioned: "setting Python up as a senior dev".](/images/blog/python-no-admin-privileges/python_setup_jr_vs_sr.jpg)

I swear software development is just getting hit by rakes.

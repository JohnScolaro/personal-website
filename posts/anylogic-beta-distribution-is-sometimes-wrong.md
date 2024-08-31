---
title: "AnyLogic Beta Distribution is Wrong for Large P or Q"
description: "For p or q parameters greater than ~int32_max, AnyLogic's Beta distribution samples incorrect values."
date: "2024-05-07"
---

[AnyLogic](https://en.wikipedia.org/wiki/AnyLogic) is a really old piece of simulation software, that like the [manatee](https://en.wikipedia.org/wiki/Manatee), exists because it has no real predators. Unfortunately companies still use it, so I've had to interact with it.

[Probability distributions](https://en.wikipedia.org/wiki/Probability_distribution) are math functions that can tell you what the probability of something happening is. One such distribution is the [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution). This distribution is a funky looking curve, defined between 0 and 1, which can look like any number of things depending on what the parameters α and β are (sometimes called p and q because mathematicians all have different favourite letters). Here are some examples:

![Some images of the beta distribution that I found on Wikipedia](/images/blog/anylogic-beta-distribution-is-sometimes-wrong/beta_distribution.png)

AnyLogic has a whole bunch of different distributions built into it. They even have their own [beta distribution](https://anylogic.help/advanced/functions/beta.html), and a [truncated variant!](https://anylogic.help/advanced/functions/beta-truncated.html) Wow!

## Two working examples

To show the problem, let us compare the beta distribution in AnyLogic using the [choose probability distribution wizard](https://anylogic.help/anylogic/stochastic/choose-pdf.html) and [SciPy](https://scipy.org/), the scientific computing package in Python.

Using a Beta in the form `Beta(α, β)`, let's first visualise a `Beta(2, 5)` in both pieces of software. The probability distribution wizard is a graphical interface in AnyLogic that allows you to plug in numbers for any available distribution, and it shows the output:

![AnyLogic Beta(2, 5) distribution](/images/blog/anylogic-beta-distribution-is-sometimes-wrong/beta_2_5_anylogic.png)

Look at that, the mean is a touch under 0.3. That's good, because according to [the beta distribution page on Wikipedia I linked before](https://en.wikipedia.org/wiki/Beta_distribution), the mean of a beta distribution is actually always α / (α + β). This is ~0.28 for our case here, which looks about right.

This Python code should show the same thing:

```python
import matplotlib.pyplot as plt
from scipy.stats import beta

# Parameters for the beta distribution
a = 2
b = 5

# Sample 100k points from the beta distribution
data = beta.rvs(a, b, size=100_000)

# Get value of the mean
mean = a / (a + b)

# Plotting the histogram of the samples
plt.hist(data, bins=100, density=True)

# Plotting the mean
plt.axvline(mean, color='black', linestyle='--')

plt.show()
```

And here is the output:

![Python Beta(2, 5) distribution](/images/blog/anylogic-beta-distribution-is-sometimes-wrong/beta_2_5_python.png)

Take a moment to convince yourself these are the same. This is excellent! Now let's try some bigger numbers:

| Parameter | Value |
| --------- | ----- |
| Alpha     | 5     |
| Beta      | 1e9   |
| Loc       | 0     |
| Scale     | 1e9   |

Here are the two plots side by side for these values. The mean should be ~5 because (5 \* 1e9) / (5 + 1e9) ~= 5. (The 1e9 on the top comes from the scale. I need to do this otherwise AnyLogic's plot freaks out and doesn't show anything at all.)

![Both Python and AnyLogic Beta(5, 1e9) distributions](/images/blog/anylogic-beta-distribution-is-sometimes-wrong/beta_5_1e9_both.png)

They're the same!

## A broken example

Ok, now let us try these parameters:

| Parameter | Value |
| --------- | ----- |
| Alpha     | 5     |
| Beta      | 1e10  |
| Loc       | 0     |
| Scale     | 1e10  |

Ahh, 1e10, a number 10 times larger than 1e9. Now let's take a look at the distributions back-to-back:

![Both Python and AnyLogic Beta(5, 1e10) distributions](/images/blog/anylogic-beta-distribution-is-sometimes-wrong/beta_5_1e10_both.png)

Aaannnnddd we broke AnyLogic. How do we know it's AnyLogic that's broken and not Scipy? Well, because the analytical solution for the mean should be ~5. Scipy gets it bang on, and AnyLogic has curiously just returned the incorrect distribution.

## Conclusion

I ran a couple more tests, and it seems that as p or q increase above `int32_max`, the samples begin to deviate from the correct distribution. I didn't investigate this much further than this, because with this knowledge I could solve my problem. But there we have it: AnyLogic Beta distributions break for p or q values larger than roughly int32_max.

I wish AnyLogic was open source so I could create an issue.

I wish AnyLogic threw an exception when p or q were too large.

I wish AnyLogic could put a warning about this in their woeful documentation.

I wish this team used [SimPy](https://simpy.readthedocs.io/en/latest/) instead.

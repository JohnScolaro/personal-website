---
title: "The AnyLogic Truncated Gamma Distribution is incorrect"
description: "Using the Gamma distribution with the 6 parameter method returns incorrect values"
date: "2024-05-08"
---

As my [last post](https://johnscolaro.xyz/blog/anylogic-beta-distribution-is-sometimes-wrong) illustrated, [AnyLogic's](https://en.wikipedia.org/wiki/AnyLogic) distributions are occasionally incorrect. This keeps you limber as an engineer, because it's always a fun surprise when expensive enterprise software is worse than [what free Python libraries provide](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.gamma.html).

Anyhow, today I am going to illustrate that the AnyLogic Gamma Distribution doesn't do what the documentation says that it should.

There are a couple different call signatures for the Gamma distribution. You can read about them [here](https://anylogic.help/advanced/functions/gamma.html) and [here](https://anylogic.help/advanced/functions/gamma-truncated.html), but essentially you can call it like:

- `gamma(alpha, beta, shift)`
- `gamma(min, max, alpha, shift, stretch)`

Alpha and Beta are the parameters, shift and stretch move and scale the distribution, and min and max are truncation bounds.

The documentation assures us that the 5 paramater signature is equivalent to calling the 3 parameter version like so: `gamma(alpha, 1, 0)` and then multiplying it by the stretch, and moving it by the shift. This means that:

- `gamma(0.5, 1, 0)`
- `gamma(0, 10, 0.5, 0, 1)`

should be equivalent. Take a moment to convince yourself of that.

Now let's use the [choose probability distribution wizard](https://anylogic.help/anylogic/stochastic/choose-pdf.html) to visualise both distributions:

![Two plots of the gamma distribution from the truncated and untruncated versions in the distribution wizard. They are obviously not the same.](/images/blog/anylogic-truncated-gamma-distribution-is-incorrect/gamma_comparison.png)

As you can see, they're obviously different. Yikes.

The mean of a gamma distribution with alpha and beta parameters is defined as alpha/beta, so the mean for this distribution should be 0.5. As you can see, the 3 parameter invocation is correct, while the 5 parameter version is incorrect. Perhaps it's just wrong. Perhaps the documentation is out of date. You decide.

AnyLogic is the worst.

---
title: "Serverless Python Websites"
description: 'Some notes about the process of creating a serverless Python website, so that it is hosted for free on AWS.'
date: "2025-02-02"
tags: ['Programming']
---

## Introduction

Over the last couple months, I rewrote a small [hobby project that visualises Strava activities](https://active-statistics.com) to be completely serverless. The website is now **server**less, but the process was certainly not **pain**less. I wanted to share some thoughts about my process in case it helps anyone.

## Why rewrite it to be serverless Python?

In short, and order of importance:

1. It's cheap.
2. It's already in Python, and I want to rewrite as little as possible.
3. I want to learn more about AWS Lambda.

In long, but still in order of importance:

### It's cheap

![An IQ scale meme showing that smart and dumb people use VPS's, but average people try to go serverless](/images/blog/serverless-python/vps_meme.png)

Something I see on the internet a lot is ["just rent a cheap box from Hetzner/digitalocean/EC2 instance" and put everything on that.](https://vancelucas.com/blog/just-use-a-managed-vps/) Problem solved. You can run a normal Python server, development will be easy, and you'll totally never have any problems again. Python has loads of ways to run normal servers (see Flask/Django/FastAPI and more) so you can just get ChatGPT to write 90% of your app, and you'll be golden.

Except one problem. That costs money. The _smallest_ EC2 instance costs ~$200 a year at the time of writing this, and the smallest box didn't have enough RAM to run `npm run build`, so I had to use a larger one. For my small hobby project, the smallest box I could get away with was ~350 USD a year. The blogs I read always say something like: "Just use a VPS, for $600 a year you won't have any problems". Well, that $600 a year IS the problem. If I'm running some money-making enterprise, that $600 is a drop in the ocean compared to developer salaries, so then it makes sense to use a VPS, but my project is a small hobby project that:

* Makes $0 a year, and is never expected to make more.
* Consistently gets about ~3 weekly users.

It's a tiny project. But it still represents hundreds of hours of time and effort, and it's a useful tool people might stumble upon. I don't want to take it down over $300/year.

The other problem with this is that [active-statistics](https://active-statistics.com) isn't my **only** hobby project. Rather than have 1 web project that I can run on a VPS, I have lots of small silly websites that barely anyone uses at all. Heck, if you read this blog post, you're probably the only person who'll read it today! If I need to pay for a hefty VPS for each project, that's $300 × N where N = number of projects I want to have. That's O(n) cost scaling, and if stupid SWE job interview questions have taught me anything, it's that I should be aiming for O(1).

### It's already in Python and I want to rewrite as little as possible.

Previously, the backend was a Flask app. Hours of work have already already been put into visualisation, data analysis, charting, and interfacing with Strava's API, and it's all already bug-free and in Python. I wanted to do as little additional work as possible to make it serverless. There might be better serverless ecosystems for other languages (this website is next.js on Vercel, so I know what's possible) but I want to keep the backend Python.

Also I use Python for work every day, so I'm curious to learn what it has to offer in this space.

### I want to learn more about AWS Lambda.

I know superficially how it works - just instantaneous compute that turns on and off - but in a past job a devops colleague was explaining to me how the backend worked, and while explaining said: "You know how lambdas are created right?" and I was like "no" and they were like: "Well that's too much to explain right now". I felt inadequate, and making my own serverless website with lambda is good excuse to use them in anger and learn how they work. Plus making your website serverless feels like flossing your teeth. You can walk around and judge everyone who hasn't flossed. You can be smug. And being smug is fun.

## The Python Serverless Ecosystem

The Python serverless ecosystem feels like walking through a graveyard. Sad, fairly empty, and lots of dead projects. When I set out to make this, I considered:

* AWS Chalice
* Zappa
* FastAPI+Mangum and manage your own infra.
* Doing it all myself from the AWS Console.
* Doing it all myself with AWS Cloudformation.
* Doing it all myself with AWS CDK.
* AWS SAM
* People keep saying Terraform to me a lot?
* Serverless Framework
* Just giving up?

What I did:

* Use some hybrid of AWS SAM and AWS Cloudformation to deploy a FastAPI+mangum serverless backend.

What I would have liked to have done in hindsite:

* Use AWS CDK to deploy a FastAPI+mangum serverless backend.

## How I came to this choice.

In a perfect world I could re-create my application using each of these methods and then report back to you about what's best, but sadly that's not possible. My evaluations of the following after making the website are:

* **AWS Chalice** - Amazon's attempt at making an easy-to-use serverless Python framework. Recently abandoned. [GitHub repo](https://github.com/aws/chalice) is littered with comments [asking if it's dead](https://github.com/aws/chalice/issues/2131). Doesn't support latest Python. Probably best not to develop on a framework that nobody seems to be working on.
* **Zappa** - [Also not developed any more](https://www.reddit.com/r/django/comments/psddt8/zappa_is_no_longer_maintained/). Although there doesn't seem to be anything official saying so.
* **FastAPI+Mangum and manage your own infra** - FastAPI is the new hotness in Python web frameworks, so I wanted to make something with it. This doesn't specify how to actually manage deploying it though, where I have a confusingly large number of options to choose from.
* **Doing it all myself from the AWS Console** - Impossible. I mean, it's theoretically not impossible, one person can't remember all the settings, permissions, roles, and bajillion configurations needed to successfully orchestrate the myriad of AWS services needed to run a serverless application. The moment you context switch away from the project, you'll forget everything, and then you'll never update the project again out of fear of breaking something. Which is exactly why the next option was created!
* **Doing it all myself with AWS Cloudformation** - Cloudformation stacks are just yaml/json files that hold all the information about the configuration of your infrastructure in one neat file! You can say "deploy" like a magic spell and everything will magically configure itself! (Unless your stack is in any of an infinite number of states when deployment will error).
* **AWS SAM** - This seemed like exactly what I needed at first. In Coudformation you deploy "resources" which represent different services. If the template has a "AWS::DynamoDB::Table" resource in it, when you deploy the stack a table is created for you. AWS SAM gives you a CLI and an "AWS::Serverless::Application" object. This object is a bunch of resources, supposed to be an abstraction of the whole serverless stack. When you deploy this object, you get AWS ECR, an S3 repo that holds with the created templates, and some other stuff. However your backend will almost certainly have many more resources then this so you end up filling the SAM template with so much resources that you might as well just write the the whole thing in either CloudFormation or CDK. That way you'll learn a skill that's useful for ALL infra development, and not just niche serverless projects.
* **Doing it all myself with AWS CDK** - What if we could define Cloudformation stacks with code instead of lame json/yaml? Then we could define our stacks programatically!
* **Serverless Framework** - A company called "Serverless" has a CLI with commands that deploy everything for you. Don't think about the infra at all and let them handle it. I haven't tried this, but it could be a good option. I wanted to understand everything I had deployed though and not use another companies abstraction, so that ruled this out.

## How it's going

When everything seemed to be working, I [shared the website in a Reddit post](https://www.reddit.com/r/Strava/comments/1if5hqf/i_made_a_website_that_animates_a_map_of_all_your/) that gained some traction. Over the next few weeks, thousands of people used my website.

Here are the total lambda invocations over the first week of deployment. There is one data point per hour, so you can see the maximum number of invocations I handled in an hour was ~1.5k.

![An image showing the total number of lambda invocations over the first week of deployment with one data point per hour. It's exponentially decaying with a peak of 1.5k invocations per hour.](/images/blog/serverless-python/total_invocations.png)

Over this time, the maximum number of concurrent lambdas running was 7.

![An image of the maximum number of concurrent lambdas firing over the first week of deployment. The max concurrent lambdas was 7 at any one time.](/images/blog/serverless-python/max_concurrent_invocations.png)

And most importantly of all, here is my AWS account cost breakdown after deployment.

![An image showing the cost breakdown of my AWS account, showing it dropping from ~20 USD per month, to ~2 USD per month.](/images/blog/serverless-python/cost_breakdown.png)

As you can see, my average monthly bill has been reduced from $20 USD to $2 USD. Servicing all these requests costs me nothing, and I'm only paying a tiny amount for Route53 records and ECR storage fees.

## Thoughts

Serverless is hard. It's hard because the infrastructure and configuration to get anything running is orders of magnitude more complex than just running a VPS. When running a VPS you:

* Get a computer.
* Get your code into it somehow. Maybe just `git clone`, maybe with a docker container, maybe Ansible, whatever.
* Run the program.
* Make sure that the server has access to the outside world via your Cloud provider of choice's interface.

Serverless is:

* Turn your backend into a container.
* Put into Container repository.
* Make a lambda with correct configuration settings.
* Make an API Gateway with the correct configuration settings.
* Make Cloudfront with the correct configuration settings.
* Somehow serve a frontend.
* Manage the separate configurations for each of these services, where if you tick a single wrong box, or enable the wrong mode, it won't work.

It's also sort of hard for me to believe that there isn't some Python package that wraps up some AWS CDK code so you can essentially call: `deploy_serverless(stack_name="my-app")` and all the infra is deployed manually.

I imagine the hard bit about some generic package is that everyone's use case will be different and users will want to bring their own DB solutions, be it Dynamo/Aurora/something with another cloud provider entirely, and if you attempt to satisfy most people + monetise it, you end up with something that looks like [serverless](https://www.serverless.com/) anyway.

## Conclusion

My serverless project is done, deployed, working, and currently costs $0/year for me to host to my glorious userbase of ~500 people/year. I'll probably continue to deploy my hobby projects in a similar way, and use AWS CDK instead of SAM.

I hope something comes along in a year or two that makes deploying serverless apps with Python backends a lot easier (and keeps it cheap), and I look forward to migrating to such a solution.
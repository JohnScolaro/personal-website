---
title: "Serverless Python Websites"
description: 'Some notes about the process of creating a serverless Python website'
date: "2025-02-02"
---

## Introduction

Over the last couple months, I re-wrote a small hobby project of mine [that visualises Strava activities](https://active-statistics.com) to be completely serverless. The website is now _server_-less, but the process was certainly not _pain_-less. I wanted to share some thoughts about my process in case it helps anyone.

## Why re-write it to be serverless Python?

In short and order of importance:

1. It's cheap.
2. It's already in Python, and I want to re-write as little as possible.
3. I want to learn more about AWS lambda.

In long, but still in order of importance:

### It's cheap

[INSERT THE IMAGE ABOUT JUST USE A VPS MEME from hackernews with IQ chart]

Something I see on the internet a lot is "just rent a cheap box from Hetzner/digitalocean/EC2 instance" and put everything on that. Problem solved. You can run a normal python server, development will be easy, and you'll totally never have any problems again. Python has loads of ways to run normal servers (see Flask/Django/FastAPI and more) so you can just get ChatGPT to write 90% of your app, and you'll be golden.

Except one problem. That costs money. And money doesn't grow in trees. The _smallest_ EC2 instance costs ~$200 a year at the time of writing this, and the smallest box doesn't have enough RAM to even run `npm start` so you've got to use larger boxs. For my small hobby project, the smallest box I could get away with was ~$350 a year. The blogs I read always say something like: "Just use a VPS, for $600 a year you won't have any problems". Well, that $600 a year IS the problem. If I'm running some money-making enterprise, that $600 is a drop in the bucket, and then maybe it is better to just pay for a VPS, but my project is a small hobby project that:

* Makes $0 a year, and is never expected to.
* Consistently gets about ~3 weekly users.

It's a tiny project. But it still represents hundreds of hours of time and effort, and it's a useful tool people might stumble upon. I don't want to take it down over $300/year.

The other problem with this is that (active-statistics)[https://active-statistics.com] isn't my **only** hobby project. Rather than have 1 web project that I can run on a VPS, I have lots of small silly websites that barely anyone uses at all. Heck, if you read this blog post, you're probably the only personal per who'll read it today! If I need to pay for a hefty VPS for each project, that's $300 * N where N = number of projects I want to have. That's O(n), and if stupid SWE job interview questions have taught me anything, it's that I should be aiming for O(1).

### It's already in Python and I want to re-write as little as possible.

Previously, the backend was a Flask app. Hours of work have already already been put into visualisation, data analysis, charting, and interfacing with Strava's API, and it's all already bug-free and in Python. I wanted to do as little additional work as possible to make it serverless. There might be better serverless ecosystems for other languages (heck this website is next.js on Vercel, so I know what's possible) but I want to keep the backend Python.

Also I use Python for work every day, so I'm curious to learn what it has to offer in this space.

### I want to learn more about AWS lambda.

I know superficially how it works - just instantaneous compute that turns on and off - but in a past job a devops colleague was explaining to me how the backend worked, and while explaining said: "You know how lambdas are made right?" and I was like "no" and they were like: "Well that's too much to explain right now". I felt inadequite, and making my own serverless website with lambda is good excuse to use them in anger and learn how they work. Plus making your website serverless feels like flossing your teeth. You can be smug about it. And that sounds fun.

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

I only have so much time in the day. In a perfect world I could re-create my application using each of these methods and then report back to you about what's best, but sadly that's not possible. My evaluations of the following after making the website are:

* **AWS Chalice** - Amazon's attempt at making an easy-to-use serverless Python framework. Recently abandoned. GitHub repo [Link this] is littered with comments saying it's dead. Doesn't support latest Python. Probably best not to develop on a framework that nobody is working on.
* **Zappa** - Also not developed any more.
* **FastAPI+Mangum and manage your own infra** - 
* **Doing it all myself from the AWS Console** - Impossible. I mean, it's theoretically not impossible, one person can't remember all the settings, permissions, roles, and bajillion configurations needed to successfully orchestrate the myriad of AWS services needed to run a serverless application. The moment you context switch away from the project, you'll forget everything, and then you'll never work on the project again. Which is exactly why the next option was created!
* **Doing it all myself with AWS Cloudformation** - Cloudformation stacks are just yaml/json files that hold all the information about the configuration of your infrastructure in one neat file! You can say "deploy" like a magic spell and everything will magically configure itself! (Unless your stack is in any of an infinite number of states when deployment will error).
* **AWS SAM** - This seemed like exactly what I needed at first. In Coudformation you deploy 'things' which represent differet services. If the template has a "AWS::DYNAMODB::TABLE" object in it, when you deploy the stack a table is created for you. AWS SAM gives you a CLI and an "AWS::SERVERLESS::APPLICATION" object. This object is supposed to be an abstraction of the whole serverless stack. When you deploy this object, you get AWS ECR, an S3 repo that holds with the created templates, and some other stuff. [Elaborate]. However it's such a thin wrapper than you end up filling the SAM TEMPLATE (which is actually just a cloudformation template anyway) with so much stuff that you might as well just write the the whole thing in either CloudFormation or CDK and learn a skill that's useful for ALL infra development, and not just specifically niche serverless projects.
* **Doing it all myself with AWS CDK** - What if we could define Cloudformation stacks with code instead of lame json/yaml? Then we could define our stacks programatically!
* **Serverless Framework** - A company called "Serverless" has a CLI with commands that deploy everything for you. Don't think about the infra at all and let them handle it.

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
* Manage the seprate configurations for each of these services, where is you tick a single wrong box, or enable the wrong mode, it won't work.

It's also sort of hard for me to believe that there isn't some python package that wraps up some AWS CDK code so you can essentially call: `deploy_serverless(stack_name="my-app")` and all the infra is deployed manually.

I imagine the hard bit about some generic package is that it probably deploys to multiple environments, and users will want to bring their own DB solutions, be Dynamo/Aurora/something else, and then expect that the framework somehow handles that too?

## Conclusion

My serverless project is done, deployed, working, and currently costs $0/year for me to host to my glorious userbase of ~500 people/year. I'll probably continue to deploy my hobby projects in a similar way, and use AWS CDK instead of SAM.

I hope something comes along in a year or two that makes deploying serverless apps with python backends a lot easier (and keeps it cheap), and I look forward to migrating to such a solution.
---
title: "AWS Subdomains and Certificates"
description: "How to configure a certificate to cover subdomains AND apex domain."
date: "2023-11-01"
---

## TL;DR

If you're using AWS CloudFront to handle HTTPS with clients, and you have your certificate for CloudFront in Amazon Certificate Manager, and you wish to have multiple CloudFront distributions for different subdomains (for example, using `example.com` as production and `test.example.com` as a testing server) all covered by the same certificate, then you need to add **two** CNAME domains into your certificate in AWS Certificate Manager with the following domains:

- example.com
- \*.example.com

This is explained about half-way down the page [here](https://docs.aws.amazon.com/acm/latest/userguide/acm-certificate.html) in the section about "Wildcard Names". It is required because \*.example.com doesn't cover "example.com", so you need both. I would have saved a lot of time reading this page, but in my defence, AWS documentation is incredibly boring.

## Setting up a Testing Server

The other day, I found myself setting up a second AWS CloudFront distribution so I could test my [Strava Data Visualisation Website](https://active-statistics.com/) without accidentally taking down production. (If it's theoretically possible to take down production, I'll usually figure out how to do it).

![Image of detective Spongebob standing in front of a pole with a poster of himself on it, described as a maniac.](/images/blog/aws-subdomains-and-certificates/spongebob_detective.png)

Essentially I had a system like this:

![Initial System](/images/blog/aws-subdomains-and-certificates/initial_infra.png)

and wanted to make something like this:

![Final System](/images/blog/aws-subdomains-and-certificates/final_infra.png)

Should be simple enough right? To get the new CloudFront distribution up and running isn't too hard. You just need to create a new CloudFront distribution, and a new EC2 instance. Set the origin/behaviour of CloudFront to behave how you expect it to, and point it at the new EC2 instance. The only part of this that I still don't understand is that when you set up CloudFront, you need to specify all the alternative names you plan on accessing your distribution with. For production in my case, this is both `www.active-statistics.com` and `active-statistics.com`. See below:

![CloudFront CNAMEs](/images/blog/aws-subdomains-and-certificates/cloudfront_cnames.png)

I don't fully understand why these actually need to be specified though (and yes, I read the docs this time. [Here](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html), [here](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html)), because in Route53 I've already specified (with alias records) that I want traffic to `active-statistics.com` to go to my production server, and traffic to `test.active-statistics.com` to go to my testing server.

![Route53 CNAMEs](/images/blog/aws-subdomains-and-certificates/route53_cnames.png)

But alas, this is required to get everything working, so just set it up and forget about it. I think it might have something to do with alias records not actually being DNS records and being a special AWS thing, but I'm not sure.

## Conclusion

1. I should read the docs more.
2. Wowzers there is a lot of complexity in infra.

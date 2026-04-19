---
pubDatetime: 2026-04-11
title: Hello tanat44.com website v2.0
tags:
  - blog
description: The tech story behind tanat44 website. How do I get here from Github pages, Jekyll, Next.js and now Astropaper. 
---

It's has been already 7 years since my first blog post in github pages on Jekyll engine. At that time, even writing markdown was new to me. What amazed me was the capability to really own the document / files / images, when I write I don't need to care even a second on how it looks. Unlike working on MS Word document where you constantly fighting with the new line / font size / tabs / bullet tabs. Plus when everything is stored in the file system, it's a typical file operations that we are so familiar with. No sql, no platform locked-in. It was one of the main reason I decided to considering having my own website. It's important for me to own it and keep it alive for many years to come.

Getting the styling right on Github pages isn't something so easy. There aren't so many default templates to choose from in standard Jekyll. It was my fault that I didn't attempt to run it locally / setup actions to build it. To be fair, it wasn't so easy. Since I didn't have my local setup, I can't validate how the page would look or whether it can be compiled. The whole experiences apart from being able to own all files weren't spot on yet.

*tanat44 homepage during 2018-early 2026 built using github pages*
![tanat44 homepage during 2018-early 2026 built using github pages](@/assets/images/githubpage.png)

5 years ago working as software developer. I started to re-learn the modern web-stack and I started to appreciate more the modern frontend technology. I spend a lot of time with Azure pipeline and Github action at work. I started to appreciate more what CICD can enables and more importantly how it might relief me from all the pains of building my own site.

I started using Next.js about 2 years ago when my colleague Grzegorz suggested that we should use it on the new application that we just started. People started moving to Next from create-react-app boiler plate. After months into it, I was still confused with app router / page router. I was building canvas library and I didn't need the backend. I had a constant struggle with 'hydration' error, 'use client'. In the end, every file starts with 'use client'.

Last two weeks: I started working with Tum on another hobby project [carspecthai.com](https://carspecthai.com). I wanted to learn something new while being somewhat productive. (Being unproductive makes the coding activity painful which I am afraid.) I wanted to deploy the site to CDN to save cost and hopefully be a bit SSO friendly. Next.js with SSG feature was the obvious choice. It's really interesting that static web deployment made a come back after 20+ years since the dawn of www. Following web evolution can be described based on my personal experiences: 
- HTML, CSS at the dawn of internet
- Jquery
- AJAX
- Backend rendering -- php
- Frontend Javascript framework movement (React, ...)
- Backend component rendering 
- SSG

I picked Astropaper for v2.0 engine of my website. I can test building the site locally before building in the cloud. I could write custom components and use in the website if I want to. But the main reason was that its design that looks nice and clean out-of-the-box and simplicity to theme / style with tailwind.

*Modernized tanat44's homepage using Astropaper*
![modernized tanat44's homepage using Astropaper](@/assets/images/astropaper.png)
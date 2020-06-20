---
layout: post
title: "Airfryer Potato"
date: 2019-06-20
description: 
image: /assets/images/potato.jpg
author: Tanut Treratanakulwong
tags: 
  - Weekend
  - Code
---

I cooked potato fries with a new (cheap) airfryer. This is my first post using Jekyll + Barber + Github hosting.

### Jekyll
Why did I choose Jekyll?
* I didn't much success writing on Wordpress. Imagine using MS Word, I often get overwhelmed by constantly changing in tab,font size,bullet point indentation, and etc. I would rather spending time setting it up then being annoyed by it.
* Writing itself is already a challenging task for me who has a very difficult time in deducing my thoughts into comprehensible sentences. So, I was looking for something that takes plain text and styles it for me. Jekyll seems like a good solution that turns a plain text into an eye-pleasing page. An example of plain text of this post.
![Placeholder](/assets/images/plaintext.png)
* After hours of scrolling through many Jekyll themes, I found [Barber Theme][1] which looks so nice with a large collage on the homepage (at least something that I want for now).

### Github
The next question that follows 'how would I host my website?' Hmmm... I looked around and found out that github can host a website. Imagine a cloud drive that not only keeps your code but also hosts your website for free. At first, it seems very simple to get index.html showing on the homepage but then pluging in Jekyll (officially supported) wasn't so easy for me. It took me several hours. 

My next challenge was to make it work with [Barber Theme][1]. This requires a work around because github doesn't support auto-built on a custom themes. Here are steps I learnt from google search:
1. With personal github account, Github.io always read index.html from 'master' branch, although in this [tutorial](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) it seems possible to choose other branches.
1. Create branch 'dev' to store your Jekyll code. 
1. Code your website in branch 'dev'. Once you are done, build the website using command 'bundle exec jekyll serve'.
1. Commit your new code and push to branch 'dev'
1. New website content will appear in folder '_site'. Copy them to somewhere outside i.e. 'New folder' on the desktop
1. Change to branch 'master'
1. Delete everything, copy all content from 'New folder' and paste inside.
1. Push changes to 'master'

Wait for a couple of minutes and refresh your github.io website. You should be able to your new site! That's a lot of manual steps. I wish it is easier but I'm pretty ok with it for now.  

[1]:https://github.com/samesies/barber-jekyll
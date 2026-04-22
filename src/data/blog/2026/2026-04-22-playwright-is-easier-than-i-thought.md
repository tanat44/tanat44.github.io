---
pubDatetime: 2026-04-22
title: Playwright is easier than I thought
tags:
  - blog
  - programming
description: I have never been convinced with test driven development because when we embark on the new software development journey, there are so many priorities to focus. Today I learn Playwright test framework.
---

I have never been convinced with test driven development because when we embark on the new software development journey, there are so many priorities to focus, to demonstrate the potential / usefulness of an application. I have been working on Canvas / Three.js library project (one of my favorite). Today, I fix one of the feature but I have no confident that other features don't get hit by the new implementation. These are the situation of my project:
- The project has been running for 1 year+
- There are 3-4 developers + some part timers
- I started to forget the whole set of requirements / implementations.
- It's hard to visualize how a change would affect the whole application.

I started to look into Playwright to save guarding ourselves from potential feature degradation. It was originally setup but barely maintain since the screenshot photos taken from Windows development machine are somehow deviate from tests running on Linux build agent. The solution to that was *simply run on WSL*.

*Playwright UI running on WSL on Windows machine*
![Playwright in action](@/assets/images/playwright.png)

I used to think that end-to-end for canvas application (imagine figma like application) is hard because we need to have full control of mouse event (click, down, move, up), keyboard events and etc. Plus, the output is visual changes not the changes in DOM or values or attributes. Of course, I am not the first person to do this. With some trial and error and googling (no AI), it doesn't take long to get to the point where whole canvas application can be tested with just few lines - one for Arrange, one for Act, another for Asset. It's as intuitive as how would use ask another person to test. 

I think Playwright UI and Codegen contributes to a very good test development experiences. I can very easily click and navigate, not typing long commands in terminal and look for result elsewhere in the file explorer.

### If I could start over, would I add testing earlier?
Probably not. As I mentioned, I do believe that top priority on new project is to prove / deliver the value. However, when the feature sets are getting stable, brains are getting full, we start loosing tracks of classes - how they are interacted, I think it's a good time to start writing tests.
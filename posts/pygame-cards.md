---
title: "Cards in Pygame"
description: "Making rotating cards in Pygame"
date: "2024-06-27"
tags: ['Programming', 'Pygame']
---

Computer games with cards in them often have cool or "juicy" effects on the cards to make them more satisfying to drag around and play with. I wanted to see if a rotating "Hearthstone-like" effect could be achieved in [Pygame](https://pyga.me/) with a card object. I created a `Card()` object that looks something like this:

![A gif showing come rectangular cards moving around. When they move, they appear to rotate in 3D to face the direction of movement slightly.](/images/blog/pygame-cards/cards.gif)

This was a fun and non-trivial challenge to do in Pygame-ce because it only supports 2D surfaces. This means you have to fake any "3D" things you want to create if you're not going to use [PyOpenGL](https://pyopengl.sourceforge.net/) to create your own custom 3D rendering pipeline. I did it using some trigonometry and [opencv-python](https://pypi.org/project/opencv-python/). I have put the code for this example on my Github [here](https://github.com/JohnScolaro/pygame-examples) in case anyone thinks it might be useful to them. I'd love to see more games written in Pygame.

## Juicy Cards

I love a good card game. In the best card games, they often use effects to make the cards seem more than just a simple rectangle on a screen. Here are some cool examples of cards in some different games: (All served as glorious low definition gifs in an attempt to make this page easier to load).

[Balatro](https://www.playbalatro.com/) Card Movement is implemented as a (probably smoothed) rotation around the Z axis.

![A GIF of Balatro Card Movement.](/images/blog/pygame-cards/balatro_card_jiggle.gif)

Balatro Idle Movement is a 3D rotation (or at least looks like it).

![A GIF of Balatro's idle card animation movement.](/images/blog/pygame-cards/balatro_idle.gif)

Balatro also has some other fancy card effects which are probably implemented with shaders. I thought I'd also just show them because they're pretty, but I'm not attempting to recreate this in Pygame without using shaders.

![An example of one of Balatro's cool card shaders.](/images/blog/pygame-cards/balatro_shader_1_low.gif)

And another:

![An example of another of Balatro's cool card shaders.](/images/blog/pygame-cards/balatro_shader_2_low.gif)

[Slay the Spire](https://en.wikipedia.org/wiki/Slay_the_Spire) has surprisingly no movement, but the card movement is smoothed, and it follows the curser rather than always being held by it.

![A GIF Slay the Spires card movement.](/images/blog/pygame-cards/slay_the_spire_card_jiggle_low.gif)

But the movement in the hand is quite nice.

![A GIF showing the card movement in the "hand" in Slay the Spire.](/images/blog/pygame-cards/slay_the_spire_hand.gif)

[Hearthstone](https://hearthstone.blizzard.com/en-us) probably had (has?) the most polish of all games in this genre, so it's not surprising to see nice effects here. Since it's made in Unity, I imagine either the cards are just 3D objects, or they have some fancy height map shader trickery going on, and you can just rotate the card object in 3D space as you would any other object to achieve their effect.

![A GIF showing Hearthstones card animation](/images/blog/pygame-cards/hearthstone_jiggle.gif)

Interestingly, Hearthstone also has no idle animation. Probably because it would make the text on the card harder to read. Balatro can get away with an idle animation because most information on the cards is shown via picture or a single digit rather than longer textual descriptions.

![A GIF showing Hearthstones card animation](/images/blog/pygame-cards/hearthstone_idle.gif)

Why do all these games do this? Because it looks good, and it feels good. If playing a game feels good, you're going to do it more. So when I Googled "Pygame Cards" and the best example I could find looked like this:

![The best Pygame has to offer in the card space](/images/blog/pygame-cards/klondike.png)

I wanted to take a crack at something better.

## How did I do it:

I won't go into the gory details, because if you care you can just read the source code on Github, but essentially the process goes like this:

1. A card is 4 points (each representing a corner of the card) in some imaginary 3D space. The center of the card is at (0, 0, 0).
2. Ask ChatGPT really nicely for the rotation matrix you need to rotate these points correctly.
3. Rotate the points in 3D space.
4. Apply a perspective transform to get the 2D screen coordinates of each corner of the card.
5. Use OpenCV to get the perspective transform matrix required to transform a flat card into the rotated points we have.
6. Get a surface representing the front of the card.
7. Use the transform to warp it with OpenCV.
8. Line the top left point of the warped surface up with the top left point of the card.
9. Draw an outline around the card with `pygame.draw.line` because it looks cool.
10. Somehow connect card "velocity" to a rotation.

By the time you get to step 3, you can draw something like this with `pygame.draw.line` and `pygame.draw.circle`:

![A GIF showing a "rotating" outline of a rectangle.](/images/blog/pygame-cards/cards_2.gif)

Here is an early prototype from when I first got the perspective warp working:

![A GIF showing an early prototype tilted card. This card is bright purple and reads "test card" multiple times.](/images/blog/pygame-cards/cards_3.gif)

## Some Interesting Problems

Whenever I code something up, I always run into problems that I didn't really think would exist, or that I thought would be easy to solve. This was no exception. Here are some of the little issues I bumped into, in order of how stressful they were:

### OpenCV's perspective transformed surface not perfectly aligning with lines drawn between points.

To see what I mean, take a look at the prototype gif I showed above. See how occasionally there are flickers of white around the edges of the card, between the border of the card and the black outline? I _think_ this is caused by aliasing being handled differently between pygame and openCV, and it results in small off-by-1-pixel artifacts around the edges of the card. I avoided ~80% of the artifacts by manually tweaking the border lines around the outside of the card. I actually still have this issue, but I don't think you can really tell any more.

### Connecting Card Rotation to Velocity

Pygame doesn't have any physics, so when I first connected velocity to the rotation of the card, card movement looked like this:

![A GIF showing an early prototype card. When I try to move it, it is jittery and doesn't look very good.](/images/blog/pygame-cards/cards_4.gif)

This is because I had defined "velocity" to be the distance moved since the last frame divided by the delta_t between frames. I was also running the game at an uncapped framerate. This means that I was rendering new frames at >200fps, while recieving mouse events at 60fps. This means that whenever I recieve a new MouseMovement event, the velocity was instantaneously huge, and then would go back to zero again right afterwards. Capping the frame rate solved the issue, but I also added some smoothing into the velocity to make the card rotation look better.

### You need a card handler for multiple cards

I hadn't really thought about needing this at all when I started making cards, but it wasn't hard to make when I realised that I needed it. You need to render cards in order (the last card rendered will be at the top), and process the events for each card (starting with the card rendered at the top). When you click on a card, it's brought in-front of all the other cards.

## Clicking Implementation

Just a complete aside here, but it was also interesting to see how some other games implemented clicking on a card. Balatro drags it from the place that it was clicked.

![A GIF showing that when you click on a card in Balatro, the mouse stays at the same position of the card that you grab.](/images/blog/pygame-cards/balatro_clicking.gif)

Slay the spire snaps it to the centre of the card.

![A GIF showing that in Slay the Spire, when you click on a card, the centre of the card snaps to the mouse.](/images/blog/pygame-cards/slay_the_spire_clicking_low.gif)

Hearthstone also snaps it to the centre of the card, but you can't really tell because when you're hovering over the card to click it, it's replaced with a larger more readable version of itself. I implemented snapping to the centre for mine. I implemented it that way because it seemed more natural, easier, and I didn't even realise that Balatro did that until after writing this blog post!

## Conclusion

I think I've made quite a pretty card implementation that could be extended for use in a low resolution pixel art game.

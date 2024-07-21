---
title: "Creating a 'Match 3' game in Pygame"
description: "Exploring the hidden complexity of a good Match 3 game implementation."
date: "2024-07-21"
---

I made a working "Match 3" component in Pygame, which could potentially be added to a game in the future. It looks a little something like this:

![A pixel art Match-3 game being manipulated with gems moving around, falling, and exploding.](/images/blog/pygame-match-3/example_1.gif)

"A Match 3 game? That's not impressive!" you may naively scoff. Well let me assure you, just like every problem in software engineering, the devil lies in the details, and I'm going to attempt to showcase some of those details here, for the possible benefit of any future match 3 enjoyers.

## The Match 3 Genre

Games of the match 3 genre require the player to organise 'things' into groups, where they explode and you get points. I'm not sure if anyone knows exactly why this organisation brings such pleasure to our primative brains, but it does. There have been hundreds and hundreds of match 3 games made over the years, but I'm not going to detail the entire [history of tile-matching video games](https://en.wikipedia.org/wiki/Tile-matching_video_game) for you, because plently of articles already do that. As a quick summary though, the entire genre takes its roots from the beginning of video games with the likes of [Tetris](https://en.wikipedia.org/wiki/Tetris), and since then, a continuous stream of these games have been made, each liberally "borrowing" ideas from their predecessors and adding new features.

From this continuous stream of games, there have been two huge stand-outs in popularity: [Bejeweled](<https://en.wikipedia.org/wiki/Bejeweled_(video_game)>) and [Candy Crush](https://en.wikipedia.org/wiki/Candy_Crush_Saga). Each of these have a completely different take on the genre with Bejeweled focussing more on frantic gamplay rewarding quick matches, while Candy Crush is a slower mobile game with no time limit, and instead a move limit.

I bring up these comparisons to show that there are many different ways to code up a match 3 game, because I think a significant amount of the "Coding up a match 3 game is easy" comes from being able to search on GitHub for: "Match 3", and seeing the thousands of Candy Crush / Bejeweled clones pop up from which I could copy code. Heck, there are even [reskinable match 3 frameworks](https://github.com/LibraStack/Match3-SDK) you could use to get your desired behaviour for free in commercial engines if all you want to make is a Candy Crush clone.

One of the main reasons why my match 3 component is a little harder to make is that I don't want to re-make Bejeweled or Candy Crush, my inspiration comes more from [You Must Build a Boat](https://en.wikipedia.org/wiki/You_Must_Build_a_Boat) and [10,000,000](<https://en.wikipedia.org/wiki/10000000_(video_game)>) which in-turn probably draw on inspiration from [Chuzzle](https://en.wikipedia.org/wiki/Chuzzle). In these match 3 games, rows and columns wrap around the board, and rather than swapping two gems, you move entire columns or rows to create matches.

Another reason why it's harder to make is because I've made it in [Pygame](https://pyga.me/). Probably not a good decision if I ever wanted to make a serious game, but since I'm a Python backend developer, doing this lets me focus on the logic of the game rather than fighting the language itself.

## Intricacies

Let's take a look at some of the features that need to be implemented to create a somewhat smooth match 3 experience.

![A demonstration of 'dragging' a column or row in the grid.](/images/blog/pygame-match-3/dragging.gif)

You can 'drag' columns and rows in the grid. When you don't drag perfectly on the axis it transitions nicely between row and column transformation. Gems "wrap" around the rows and columns. This means they have to be in two places at once when they're half wrapped around the screen.

![An example of the grid snapping back into alignment after dragging to a position that does not result in a match.](/images/blog/pygame-match-3/snapping.gif)

If a match isn't found, the row/column moved snaps back into position. Notice that while a row is snapping back into position, you can grab another row and move it. You don't need to wait for the original row to snap back before moving another. The gif doesn't show this, but you can't grab a _row_ and move it while another _column_ is snapping into place.

![An example of the grid re-aligning itself after being dragged into a match with some offset.](/images/blog/pygame-match-3/realigning.gif)

In this above GIF, the player drags gems to a matching position, and the matching gems explode. However, the column wasn't perfectly aligned with the rest of the grid when it was unclicked. In this scenario, it 're-aligns' smoothly back into a grid.

![An example of combos in the match 3 game.](/images/blog/pygame-match-3/combos.gif)

The grid handles combos, because we **need** those juicy combos.

![An example of the grid still being grabbed and interactive while gems are exploding and replacing exploded gems.](/images/blog/pygame-match-3/moving_while_comboing.gif)

But similarly to however this is implemented in "You Must Build a Boat", while the grid is mid-combo, it's still interactive. You don't need to wait for the combo to finish to submit more moves into the grid. Or at least, it's partially interactive because you can't drag rows or columns where gems are mid-explosion or mid fall.

![A slow motion close-up on the gem explosion animation and subtle particle effects.](/images/blog/pygame-match-3/animation_and_particle_effects.gif)

Explosions have a few frames of animation, and even throw out a few particles for extra _juice_.

## Implementation

Writing the code for this component is probably one of the more complex things I've ever created. Over my career in the endless fight against complexity, I find myself avoiding state in classes as much as possible, because inevitably you treat `self` as a grab-bag of global variables that all functions in the class have access to. This component is very stateful, so I found it hard to split the code into logical sections and keep everything clean. After toying with it for a long time, the basic architecture looks like so:

![A diagram showing the basic architecture of the match 3 class. It has 3 boxes labelled: "Gem", "Frontend Grid", and "Backend Grid".](/images/blog/pygame-match-3/animation_and_particle_effects.gif)

The three logical components I've came up with are:

### The Frontend Grid

The frontend grid is the entire component. It contains all the other components. The job of the frontend grid is to:

- Hold a 2D array of Gems and display them.
- Manage the mouse inputs of the player, and convert them into `MoveActions` to submit to the BackendGrid.
- Apply all the RowColTransforms and tween them.
- Change the state of gems when needed.

The movement of the gems in the grid look faily complex, but everything can be achieved with either:

1. Falling movement which is actually handled by the gem.
2. RowColTransforms. This is what I call an offset to either a row of a column. It's basically an object like: `RowColTransform(axis='row', index=2, magnitude=15)`. This means: "Row 2 should be moved 15 pixels to the right". This can be combined with a little information like: "Time since dropped" and offsets can be easily tweened.

### The Backend Grid

The backend grid is the "Backend" so-to-speak, so it doesn't entertain faff like "tweening" or "falling/exploding" states. Its sole jobs are:

1. Maintain a lightweight 2D array of gem types.
2. Apply `MoveAction`s and return `ExplodeAndReplacePhase`'s. Move actions are objects like: `MoveAction(axis='row', index=2, amount=3)` which translates to: "Move row 2 3 gems to the right". And return objects like: `ExplodeAndReplacePhase(matches=[[(1, 1), (1, 2), (1, 3)], replacements=[GREEN, RED, BLUE]])` which translates into: "Please explode the gems in (1, 1), (1, 2), and (1, 3), and then replace them with gems of the colors green, red, and blue.
3. Return matches in hypothetical situations. This is used to create the white lines representing: "If you unclick now, this will be a match". You can see them in the GIFs above.

This grid moving logic is important to get 100% correct, and seperating it like this lets you unit test it easily. It also lets you completely ignore it when worrying about animating the frontend, and this seperation of concerns is excellent.

### The Gem

These are frontend gems. They are either in the `IDLE`, `FALLING`, or `EXPLODING` states, and they render themselves. When I started working on this grid, I thought the entire grid would need a state like this, but as I worked on it, it became clear that this state needed to be pushed down to the gem layer. Here is an example that hopefully shows why this is necessary. Consider the following state:

![A still image of the game grid before. Two matches have been highlighted, one above another with gems in-between](/images/blog/pygame-match-3/falling_example.png)

The user has just unclicked, and this is going to trigger two explosions. From a FrontendGrid point of view, there will be idle gems, exploding gems, falling gems, and (hypothetically if the player clicked and dragged again quickly) dragged/snapping gems all in the same frame. Clearly the state can not belong with the frontend grid. Also consider that the offsets in the center column here can't be represented with a `RowColTransform`. There are two gems that need to fall a distance of 3 gems, then two more gems that need to fall a distance of 4 gems before they hit something. To address this, when gems are set into a falling state, they control their own movement. This means when they land, you'll get two "clack" sound effects which are very satisfying.

Also, when gems are in the "IDLE" state, they actually render themselves 5 times! Once in the spot they're in, but also once more in each direction, exactly one board-length away. This handles the wrapping of the gems easily! You only want to do this in the "IDLE" state though, because otherwise when gems are falling in from off-screen, they'll wrap around to the bottom. 😬

## Final Notes

People always talk smack about Pygame and it's efficiency. My implementation is nowhere near as efficient as it could be, and it runs easily at 200+ fps. I know I'm currently calculating all matches in the grid every single frame and I haven't ran into any problems at all.

The code running this whole thing is probably about 1500 lines, with another 1500 lines of tests. That's not including peripheral code like other utilities used by the grid like audio managers, etc, just the lines in the files related to the match 3 component.

I'm toying with the idea of turning this into a game, but if that doesn't happen, I'll open source it and update this page. There should be more **good** match 3 games, and less brainless microtransaction fuelled match 3 games.

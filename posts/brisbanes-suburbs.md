---
title: "Brisbane has too many Suburbs"
description: "And my personal quest to remember all 190+ of them"
date: "2024-10-06"
---

Brisbane has far too many suburbs. Seriously. I've lived in this city for almost 30 years, and the amount of interactions I've had take this form is insane:

> Where do you live?"
>
> "Bellbowrie"
>
> "... Where's that?"
>
> "Do you know where Pullenvale is?"
>
> "... no"
>
> "Kenmore?"
>
> "No."
>
> "Indooroopilly? Surely you know Indooroopilly?"
>
> "No."
>
> "Ok, errrrr, well you just get on Moggill Road and drive west 30 minutes."
>
> "ahh, west side, got it."

Or:

> "I live in [generic northside suburb]!"
>
> "Oh cool, where is that?"
>
> "haha near Chermside."
>
> "haha cool"

## What's the Problem

Brisbanites use suburbs to indicate different locations. If you need a more granular address, you can use street names or an actual address, but obviously nobody knows the location of every street in the city. If you need less detail you can give a vague direction like: "Northside" or an adjacent city like "Logan-way", but if you're explaining where you live to someone from Brisbane, you'll tend to use the suburb.

In the Brisbane local government area (LGA), there are 190 mainland suburbs. That's right, **190**! And that doesn't even cover some big suburbs fairly close to the city!

What's that? You live in Beenleigh? Well that's actually not in the Brisbane LGA, that's the "Logan City" LGA. How about Albany Creek? #pranked, that's in the "Morton Bay City" LGA. What about Goodna? It's 20km from Brisbane CBD, and is on the train line directly to Roma Street, surely it's in the Brisbane LGA right? WRONG! It's in the "Ipswich City" LGA! So even if you do manage to somehow memorise the whopping 190 suburbs of Brisbane, that STILL isn't enough.

The number of suburbs in the LGA's surrounding Brisbane are:[^1]

| **LGA**         | **Suburbs** |
| --------------- | ----------- |
| Brisbane City   | 190         |
| Ipswich City    | 78          |
| Logan City      | 63          |
| Morton Bay City | 99          |
| **Total**       | **430**     |

Yikes, that's a lot. Realistically you wouldn't have to remember all of these for a fairly comprehensive Brisbane knowledge though, probably just a couple of the most populous non-Brisbane suburbs, and all the suburbs with train stations out to Ipswich and the Gold Coast. For example, Ipswich has a suburb called "[New Chum](https://en.wikipedia.org/wiki/New_Chum,_Queensland)" with a population of 0, so it's probably not worth learning about New Chum. 😔

As a consequence of the extraordinary number of suburbs, it's hard to explain to someone where you live without using Google Maps to help you understand.

## Solution One - Just remember every suburb

I've been having a blast for the last month, slowly memorising all the countries/capitals/flags of the word with [Anki](<https://en.wikipedia.org/wiki/Anki_(software)>), a spaced-repetition flashcard app, using the [Ultimate Geography](https://ankiweb.net/shared/info/2109889812) deck. Over a month, I've stuffed my brain with over 600 cards worth of information, introducing the default 20 cards per day, and can somehow recall all of them pretty well. The spaced repetition system works wonders for remembering information. So why not create a set of flashcards for all Brisbane suburbs, _and just remember them all?_

Well, thanks to the excellent work done by the Queensland Government, I can download the [detailed borders](https://qldspatial.information.qld.gov.au/catalogue/custom/detail.page?fid=%7B8F24D271-EE3B-491C-915C-E7DD617F95DC%7D) of all the localities (What we call "suburbs" are technically called "localities") of Queensland, and thanks to the creators of the [genanki](https://github.com/kerrickstaley/genanki) Python package, I can programatically generate myself flashcards for all of Brisbane's Suburbs! (If you want the deck for yourself, you can find it [here](https://ankiweb.net/shared/info/1610977540), or you can create it from the [source code](https://github.com/JohnScolaro/brisbane_suburbs_anki_cards) if you'd like).

The cards look like this:

![The suburb of Brisbane City whited out, overlaid on a map of Brisbane](/images/blog/brisbane-suburbs/brisbane_city.png)

or this:

![The suburb of West End whited out, overlaid on a map of Brisbane](/images/blog/brisbane-suburbs/west_end.png)

The name of the suburb is initially hidden, and after you've guessed, it is revealed. I created a card for all 195 localities of Brisbane, and set to memorising them all.

## How it's going

## Shittest Suburbs of Brisbane

## Best Suburbs of Brisbane

## References

[^1]: According to [this Wikipedia page](https://en.wikipedia.org/wiki/List_of_Brisbane_suburbs) and not the official localities KML file, but I'm sure it's close enough.

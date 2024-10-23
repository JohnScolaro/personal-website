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

## Are you really complaining about arbitrary lines on a map?

Yes. After all, isn't complaining about arbitrary lines on a map one of mankinds favourite passtimes? Where there is land and a reason to seperate it into areas, there will be arguments. Internationally, there are currently [hundreds of territorial disputes](https://en.wikipedia.org/wiki/List_of_territorial_disputes). Historically, the states of Australia have [had disputes](https://en.wikipedia.org/wiki/South_Australia%E2%80%93Victoria_border_dispute). There are obvious reasons why disputes would arise in the drawing of [federal electoral boundaries](https://www.abc.net.au/news/2011-11-02/a-beginners-guide-to-gerrymandering/9389878). It's fun for the whole family.

In contract to any of the above example, my gripe is far more basic. I think Brisbane has too many suburbs.

## What is a suburb anyway?

Australia has a lot of different methods of dividing up its land.

- States
- Federal, State, and Local Government Electorates (for running the country)
- Post Codes (for sending mail)
- [Aged Care Planning Regions](https://www.abs.gov.au/census/guide-census-data/geography/census-geography-glossary#aged-care-planning-regions-acpr-) (for managing aged care)
- [Australian Drainage Divisions](https://www.abs.gov.au/census/guide-census-data/geography/census-geography-glossary#australian-drainage-divisions-add-) (for managing water)
- [Banana Biosecurity Zone](https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Boundaries/AdminBoundariesFramework/MapServer/132) (for managing banana 🍌)

If you want to find more, have a browse of the [Queensland Spatial Catalogue](https://qldspatial.information.qld.gov.au/catalogue/custom/index.page) or the [Australian Bureau of Statistics](https://www.abs.gov.au/census/guide-census-data/geography).

Suburbs are just another way of dividing up land. The definition of a suburb vaguely boils down to "an area in a city", and so the government has codified these somewhat arbitrary areas into official suburbs so they can be used for other purposes (Like statistical reporting, or combined together to form larger areas).

## What's the Problem?

Brisbanites use suburbs to indicate different locations. If you need a more granular address, you can use street names or an actual address, but obviously nobody knows the location of every street in the city. If you need less detail you can give a vague direction like: "Northside" or an adjacent city like "Logan-way", but if you're explaining where you live to someone from Brisbane, you'll tend to use the suburb.

In the Brisbane local government area (LGA), there are 190 mainland suburbs. That's right, **190**! And that's only the Brisbane LGA! If you dare drive more than 20 minutes out of the city into an adjacent LGA, you'll have to remember about ~200 more suburbs to know where you are, and you haven't even left the "Greater Brisbane Area" yet.

What's that? You live in Beenleigh? Well that's actually not in the Brisbane LGA, that's the "Logan City" LGA, which has another 63 wonderful suburbs. So if you truely want to learn all the suburbs of greater Brisbane you have a lot more to learn.

The number of suburbs in the LGA's surrounding Brisbane are:[^1]

| **LGA**         | **Suburbs** |
| --------------- | ----------- |
| Brisbane City   | 190         |
| Ipswich City    | 78          |
| Logan City      | 63          |
| Morton Bay City | 99          |
| **Total**       | **430**     |

Yikes, that's a lot. Realistically you wouldn't have to remember all of these suburbs. Probably just all of Brisbane's, and a couple of the most populous non-Brisbane suburbs + all the suburbs with train stations out to Ipswich and the Gold Coast. For example, Brisbane has an industrial suburb called "[Larapinta](https://en.wikipedia.org/wiki/Larapinta,_Queensland)" with a population of 0, so it's probably not worth learning about Larapinta. 😔

Not only do we reference our suburbs in casual conversation, for some reason we've based our entire public transit system around an integral understanding of all Brisbane's suburbs. We've called the Brisbane train lines: "The Ferny Grove and Beenleigh Lines", "Shorncliffe and Cleveland Lines", or "The Springfield Service". They've been labelled by their destination suburb, requiring you to know the suburb to know where the train goes. And of the 5 suburbs mentioned above, only 1 of them is even in the Brisbane City LGA. Brisbane's extensive bus network is similar:

![An image showing the from signage of 5 busses. They all have a number on the left and then the suburb name as the name of the bus.](/images/blog/brisbane-suburbs/busses.png)

As a consequence of the extraordinary number of suburbs, it's hard to explain to someone where you live, or catch a train/bus without using Google Maps as a crutch.

## Solution 1 - Just remember every suburb

![An AI generated image of a man hovering above the ground as he sits in a cross legged meditative pose. In the background is Brisbane.](/images/blog/brisbane-suburbs/memorise_all_suburbs_man.jpg)

Recently, I've been having a blast slowly memorising all the countries/capitals/flags of the world with [Anki](<https://en.wikipedia.org/wiki/Anki_(software)>), a spaced-repetition flashcard app, using the [Ultimate Geography](https://ankiweb.net/shared/info/2109889812) deck. Over ~2 months, I've stuffed my brain with over 990 cards worth of information, and can somehow recall all of them pretty well. The spaced repetition system works wonders for remembering information. So why not create a set of flashcards for all Brisbane suburbs, _and just remember them all?_

Well, thanks to the excellent work done by the Queensland Government, I can download the [detailed borders](https://qldspatial.information.qld.gov.au/catalogue/custom/detail.page?fid=%7B8F24D271-EE3B-491C-915C-E7DD617F95DC%7D) of all the localities (What we call "suburbs" are technically called "localities") of Queensland, and thanks to the creators of the [genanki](https://github.com/kerrickstaley/genanki) Python package, I can programatically generate myself flashcards for all of Brisbane's Suburbs! (If you want the deck for yourself, you can find it [here](https://ankiweb.net/shared/info/1610977540), or you can create it from the [source code](https://github.com/JohnScolaro/brisbane_suburbs_anki_cards) if you'd like).

The cards look like this:

![The suburb of Brisbane City whited out, overlaid on a map of Brisbane](/images/blog/brisbane-suburbs/brisbane_city.png)

or this:

![The suburb of West End whited out, overlaid on a map of Brisbane](/images/blog/brisbane-suburbs/west_end.png)

The name of the suburb is initially hidden, and after you've guessed, it is revealed. I did a lot of fiddling with the zoom levels of the maps, and testing different tilesets, but I felt that a "good map" prioritised:

- Ability to see names of neighboring suburbs
- Ability to see main roads and rail lines

I settled on using a fairly detailed OpenStreetMap tileset. Google Maps kept showing irrelevant businesses which would cover the map and it didn't play nicely with [contextily](https://contextily.readthedocs.io/en/latest/) which made generating the cards relatively easy. OpenStreetMaps also shows the road and rail systems more clearly, but the text in the tiles was smaller. Since I can pinch-to-zoom on the mobile flashcard app, I wasn't too concerned about that.

I created a card for all 195 localities of Brisbane, and set to memorising them all.

### Deck Iteration 1

On my first attempt creating the deck of suburbs, the suburbs were introduced in alphabetical order. This was a terrible idea. My brain was instantly assaulted by: Acacia Ridge, Albion, Alderly, Algester, Annerley, Anstead, Archerfield, Ascot, Ashgrove, Aspley, and Auchenflower.

![A meme of containing humanoid versions of the suburbs of Albion, Alderly, Algester laughing at me before Aspley suplexes me into the ground](/images/blog/brisbane-suburbs/suburb_meme.jpg)

I regenerated the deck, but in order of "Increasing distance to Brisbane CBD" and started again.

### Deck Iteration 2

To truely bloat our suburb count, Brisbane has accumulated a number of what I'm calling "suburb groups". Here are some examples:

- Kenmore and Kenmore Hills
- Stafford and Stafford Heights
- Wynnum and Wynnum West
- Don't worry, there are a **lot** more

For these adjacent suburbs, I think their sole purpose is that they allow you to do this:

![A meme of sleepie Pooh captioned "Brookfield" and fancy tuxuedoed Pooh captioned "Upper Brookfield"](/images/blog/brisbane-suburbs/brookfield_and_upper_brookfield.png)

These examples are some of the _most_ sensible I could find. Here are some of the less sensible groups, showcasing the wacky and logic defying nature of human boundary definition and naming:

- Mt Gravatt, Mt Gravatt East, and Upper Mt Gravatt (where Upper Mt Gravatt is further South **AND** lower in elevation than the other suburbs)[^2].
- Kedron and Upper Kedron (which are located over 15km away from each other and Upper Kedron doesn't even touch Kedron Brook, it's namesake).
- Rochedale and Rochedale South, where Rochedale is in the Brisbane LGA, but Rochedale South is in the Logan LGA.
- Everton Park and Everton Hills, where Everton Park is in the Brisbane LGA, but Everton Hills is in the Moreton Bay LGA.

These 'suburb groups' make learning harder. When I look at the map, if I see Chermside West directly west of the suburb I'm trying to guess, I know it's obviously Chermside without having to link it to it's surrounding suburbs. For all "group suburbs" (except the non-adjacent Kedron's 😤) I made a new special-case card where they are both plotted in the same card, and you need to guess both names.

These cards look like this:

![A map of Brisbane with both Chermside and the neighboring Chermside West blanked out.](/images/blog/brisbane-suburbs/chermside_and_chermside_west.jpg)

I'm also making special case maps for the localities on Moreton island, showing their location relative to Moreton Island as a whole vs just the zoomed in locality, because for these rare localities, you really want to know where it is on the island, and the zoomed in images give no context.

![Two small maps of Bulwer, labelled before and after. The 'before map' is huge, but it's essentially just a rectangle surrounded by green. The after map contains all of Moreton Island and just a small rectangle highlighted.](/images/blog/brisbane-suburbs/bulwer_before_and_after.jpg)

## Solution 2 - Just Delete some Suburbs

Remembering all the suburbs worked, but it was hard. An easier solution could be to just delete some suburbs. Can we delete suburbs? Sure! In 1975 Brisbane demoted [Rosalie](https://en.wikipedia.org/wiki/Rosalie,_Queensland) from suburb to a simple neighberhood in the suburb of Paddington. However, possibly because:

- Demoting the suburb you're familiar with and identify as living in feeds 😠👎, while
- Adding a suburb to recognise your special uniqueness and individual heritage feels 😊👍 (even if it increases the cognitive load of everyone else who lives in the city)

this doesn't happen very often. Perhaps that's why we have so many suburbs in the first place?

If we're going to delete some suburbs though, someone is going to have to pick some suburbs to delete. Here are my votes after forcing myself to memorise all of them:

### Brisbane's Worst Suburbs

When I say worst, I'm talking purely about how much I think the suburb should exist, not the contents of the suburb. If the suburb is tiny and has non-sensicle boundaries, perhaps it would best serve the City of Brisbane by being absorbed by a more well-known neighboring suburb.

#### 1: [Petrie Terrace](https://en.wikipedia.org/wiki/Petrie_Terrace,_Queensland)

![A map of Brisbane with Petrie Terrace highlighted](/images/blog/brisbane-suburbs/petrie_terrace.jpg)

Top of the list of Brisbane's stupidest suburbs is Petrie Terrace. Petrie Terrice is literally a single road. It's named after an early Australia Pioneer [Andrew Petrie](https://en.wikipedia.org/wiki/Andrew_Petrie), who does seem like a guy worth honoring, but luckily for us, there is ALREADY A SUBURB NAMED AFTER HIM CALLED [PETRIE](https://en.wikipedia.org/wiki/Petrie,_Queensland) ALSO IN BRISBANE. We don't need two suburbs named after the same man. It also has a measly population of ~1,000, compared to the ~10,000 of the average suburb.

Petrie Terrace being a standalone suburb is a joke. In my opinion, it should be combined into Milton.

#### 2: [Stones Corner](https://en.wikipedia.org/wiki/Stones_Corner,_Queensland)

![A map of Brisbane with Stones Corner highlighted](/images/blog/brisbane-suburbs/stones_corner.jpg)

Stones Corner is another tiny suburb, with a population of ~2,000 this time. It's simply the corner of two roads, and is named after James Stone, a man who failed to apply for a hotel license in the 1800's and doesn't have a Wikipedia page. (No hate James, I don't either). It's well known that Stones Corner is a silly suburb, because it was deleted in 1975, before being brought back because "Stones Corner is such an iconic area of not just our local community, but Brisbane as a whole".[^4]

If I can speak as a Brisbane resident of 30 years, I don't really know anyone outside Stones Corner who cares about it at all, and I'd hazard a guess that most people wouldn't be able to tell you where it is on a map. I'd also argue that it's not iconic in the slightest, as it has the smallest Wikipedia article out of all the Brisbane suburb articles that I've read. If someone could point me in the direction of a single historical event that ever occured in Stones Corner, I'd happily drop this down the list.

Delete this suburb.

#### 3: [Grange](https://en.wikipedia.org/wiki/Grange,_Queensland)

![A map of Brisbane with Grange highlighted](/images/blog/brisbane-suburbs/grange.jpg)

Grange is an interesting one. It has a population of ~4000, so it's on the small side. It also has an boring name, named after a tanning company from the 1800's that was later developed. It contains a single school, Wilston State School, which is shamefully named after the neighboring suburb of Wilston because nobody really knows about Grange. Already it's not looking great, but let me show you my main gripe about Grange.

In Brisbane, the suburbs and train lines often share the same name. Take for instance the lovely suburbs of Chelmer, Graceville, Sherwood, and Corinda:

![A map of Brisbane with Chelmer, Graceville, Sherwood and Corinda highlighted](/images/blog/brisbane-suburbs/corinda_4.jpg)

You can see here, that these suburbs are nicely arranged in order, containing all streets on either side of the train line, bounded by the river. There are 4 train stations in these suburbs, named the exact same as the suburbs they are in. 👏It👏just👏makes👏sense👏.

Now peer back to the map of Grange. We can see the train snake by, and Grange is less than 500m away from Alderly, Newmarket, and Wilston stations. Why isn't this land part of those suburbs? It would 👏just👏make👏sense👏 if the boundaries of Alderly, Newmarket, and Wilston stretched up to Kedron Brook. I mean, the school is already called Wilston State School, would it hurt to just chop up the suburb?

#### 4: [Upper Kedron](https://en.wikipedia.org/wiki/Upper_Kedron,_Queensland)

![A map of Brisbane with Kedron and Upper Kedron highlighted](/images/blog/brisbane-suburbs/kedrons.jpg)

Do I really explain why Upper Kedron should be removed? Kedron is an inner city suburb. It's on the Kedron brook. Upper Kedron is 15km west, and is **not** on the Kedron Brook. If you specifically designed a city to be as confusing as possibly, this is sort of shit you'd pull.

Upper Kedron also has the benefit of being near Ferny Grove, a fairly well known suburb, so why not just combine Ferny Grove and Upper Kedron?

#### 5: [Middle Park](https://en.wikipedia.org/wiki/Middle_Park,_Queensland), [Riverhills](https://en.wikipedia.org/wiki/Riverhills,_Queensland), and [Westlake](https://en.wikipedia.org/wiki/Westlake,_Queensland)

![A map of Brisbane with Middle Park, Riverhills, and Westlake highlighted](/images/blog/brisbane-suburbs/centenary_suburbs.jpg)

These suburbs are actually quite cool. Originally all this land (Middle Park, Riverhills, Westland, Jindalee, Mount Ommaney, Jamboree Height, and Sumner) was known as Jindalee. These became known as the Centenary suburbs as they were developed in 1959 (to mark 100 years since Queenland's seperation from New South Wales in 1859), and were split up into a number of smaller suburbs.

My main points here are that:

- These suburbs were all developed from the same farmland, share the same heritage, and aren't different from eachother in any meaningful way.
- Westlake, Middle Park, and River Hills are some of the most garbage named suburbs in all of Brisbane.

"West Lake" - It's because this is the western suburb with the lake in it. 💀

"Middle Park" - Oh let me guess, there is a park in the middle? 🫠

"River Hills" - Oh perhaps it's the hills by the river? 🙃

Delete all of these, and restore the glorious mega-Jindalee.

### Brisbane's Best Suburbs

In contrast to those terrible suburbs above which I'd argue should be deleted, let's give some examples of totally EPIC suburbs.

#### 1: [Chermside](https://en.wikipedia.org/wiki/Chermside,_Queensland)

![A map of Brisbane with Chermside and Chermside West highlighted](/images/blog/brisbane-suburbs/chermside_and_chermside_west.jpg)

If you live northside, people will ask: "Is it near Chermide?"

#### 2: [St Lucia](https://en.wikipedia.org/wiki/St_Lucia,_Queensland)

![A map of Brisbane with St Lucia highlighted](/images/blog/brisbane-suburbs/centenary_suburbs.jpg)

#### 3: [New Farm](https://en.wikipedia.org/wiki/New_Farm,_Queensland)

![A map of Brisbane with Newfarm highlighted](/images/blog/brisbane-suburbs/centenary_suburbs.jpg)

## Fun Facts About Brisbane I've Learnt While Doing This

I tend to learn suburbs better if I read their Wikipedia page and can remember some interesting fact about the suburb, so a side effect of learning all the suburbs is that I've learnt some niche Brisbane fun-facts. Here are some of my favourite:

- [Tarragindi](https://en.wikipedia.org/wiki/Tarragindi,_Queensland) was named after a guy called: "Tarra Gindi" who was transported to Australia from the Loyalty Islands in the late 1800's. He escaped and cleared land in what is now Tarragindi.

- [Woolloongabba](https://en.wikipedia.org/wiki/Woolloongabba) used to be called: "One Mile Swamp", and [Eight Mile Plains](https://en.wikipedia.org/wiki/Eight_Mile_Plains,_Queensland) was 8 miles away from One Mile Swamp. [Stones Corner](https://en.wikipedia.org/wiki/Stones_Corner,_Queensland) was also known as "Burnett's Swamp". It's no wonder that Brisbane frequently floods.

- [Coronation Drive](https://en.wikipedia.org/wiki/Coronation_Drive) used to be called: "River Road" which actually makes a lot more sense than being named after the coronation of another countries King.

- There are a number of suburbs that "we actually forgot how we named it, haha, sorry 😬". We _think_ that [Virginia](https://en.wikipedia.org/wiki/Virginia,_Queensland) is named after the US State Virginia. We don't know how [Tingalpa](https://en.wikipedia.org/wiki/Tingalpa,_Queensland) got it's name, or [Pinjarra Hills](https://en.wikipedia.org/wiki/Pinjarra_Hills,_Queensland) either.

- Some of our suburbs were spelt incorrectly and we just rolled with it. [Coopers Plains](https://en.wikipedia.org/wiki/Coopers_Plains,_Queensland) should really be "Cowper's Plains", [Algester](https://en.wikipedia.org/wiki/Algester,_Queensland) should really be "Alcester",[^3] and [Enogerra](https://en.wikipedia.org/wiki/Enoggera,_Queensland) should probably be "Euogerra".

## In Conclusion

![The classic Simpsons meme of "old man yells at cloud", except I've replaced the word "cloud" with "suburbs".](/images/blog/brisbane-suburbs/old_man_yells_at_suburb.png)

## References

[^1]: According to [this Wikipedia page](https://en.wikipedia.org/wiki/List_of_Brisbane_suburbs) and not the official localities KML file, but I'm sure it's close enough.
[^2]: Check out a topographic map [here](https://en-au.topographic-map.com/map-hrvggp/Upper-Mount-Gravatt/?center=-27.54313%2C153.08126&zoom=13) if you want to check. I don't have average for the offical suburb boundaries, but it does appear that _upper_ Mt Gravatt is actually lower than Mt Gravatt and Mt Gravatt East.
[^3]: The source for this isn't on the wikipedia page, you need to go to the [Queensland Place Names](https://www.qld.gov.au/environment/land/title/place-names/queensland-place-names-search) website, and specifically search for "Algester".
[^4]: The source for this quote is [here](https://www.couriermail.com.au/questnews/southeast/stones-corner-community-wins-battle-to-return-as-a-suburb/news-story/a481fd8c72fe3f56c6d7da4fc1d9ebb8) if you truely want to read about this marvelous event.

## MEmes to Sprinkle in in due course

![](/images/blog/brisbane-suburbs/petrie-terrace-bad.png)

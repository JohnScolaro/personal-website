---
title: "Python Code Smells - Passing self to objects"
description: "Passing self into other Python objects is a common anti-pattern that dramatically increases complexity."
date: "2025-04-18"
tags: ["Programming", "Python"]
---

I've spent most of the last ~6 years writing Python every day. Nowadays when writing code, besides everything working (obviously) the number one priority is the endless battle to keep the [complexity spirit demon](https://grugbrain.dev/) away. What I'm going to write about below is a big door for complexity to enter your code.

In python you have classes, and when instantiated the resulting objects have state. Like this one:

```python
class Car:
    def __init__(self) -> None:
        self.wheels = [Wheel(), Wheel(), Wheel(), Wheel()]
```

As a fellow human, I acknowledge that I can only hold a couple different things in my brain at one time. As the amount of state in an object increases, I find that complexity grows uncontrollably.

![An image of a graph showing that complexity rises exponentially with more state](/images/blog/python-code-smells-passing-self/plot.png)

Because of this, it's important to keep the amount of state in objects as low as possible. Sometimes it's easy to do this, but sometimes it's just hard due to the nature of the problem being solved.

These instantiated classes are neat little parcels of state, and it's easy and convenient to only have to think about one class's state at a time.

Let's take a look at a bad example:

```python
class Car:
    def __init__(self):
        self.speed = 0
        self.wheels = [Wheel(self) for _ in range(4)] # Cursed Line

class Wheel:
    def __init__(self, car: Car): # Cursed Line
        self.wear = 0
        self.car = car # Cursed Line

    def check_car_speed(self):
        print(f"Car speed: {self.car.speed} km/h")
```

In this contrived example, the wheel object needs to know the cars speed. Technically this works! We can pass a reference to the car object into each wheel, and we can just access it now right?

**DON'T DO THIS**

You've violated the _sacred_ encapsulation of each object. Now when trying to reason about the `Car` object, I need to also read and understand the entire `Wheel` object to know if it's modifying anything.

The amount of state I need to hold in my head is the state of the `Wheel` **and** the `Car`. You might smirk and say:

> But John, this class is simple, that's easy.

Obviously, I just made it up. It's important to remember that classes you'll work with in a real production application are a lot longer, and will make your brain turn off before you finish reading them. They look more like this:

```python
class Car:
    def __init__(self) -> None:
        self.wheels = [Wheel(), Wheel(), Wheel(), Wheel()]
        self.engine = Engine()
        self.seats = [Seat() for _ in range(5)]
        self.steering_wheel = SteeringWheel()
        self.something_else = "white"
        self.blah = 100.0  # percentage
        self.nobody_is_reading_this_any_more = 0  # kilometers
        self.brain_slowly_turning_off = False
        self.too_many_objects = True
        self.to_hold_in_memory = Radio()
        self.at_the_same_time = GPS()
        self.has_sunroof = False
        # and 100 more lines here

    def one_of_100_more_functions_in_this_class(self) -> None:
        pass

    # 1000 more lines of functions here.
```

Of course `Wheel` is defined in an equally long `wheel.py` file.

Working with this class is now hard. Don't make it harder by doubling the amount of state you need to think about.

So what can you do about it?

Well it depends on what your use case is. A solution I like more is to allow getting the information with a callback.

Something like this:

```python
class Car:
    def __init__(self):
        self.speed = 0.0
        self.wheels = [Wheel(self.get_speed) for _ in range(4)]

    def get_speed(self) -> float:
        return self.speed

class Wheel:
    def __init__(self, get_speed_callback): # Cursed Line
        self.wear = 0
        self.get_speed_callback = get_speed_callback

    def check_car_speed(self):
        print(f"Car speed: {self.get_speed_callback()} km/h")
```

Sure, the `Wheel` can get the car's speed, but the way it does so is constrained and defined in the `Car` class. The `Wheel` doesn't have willy-nilly access to _everything_, it can only access the speed.

> But John, I still think you're wrong.

Well let's ask Mr ChatGPT, who has trained for millions of man years on the finest publicly available code examples:

![An image of some text from ChatGPT agreeing with me](/images/blog/python-code-smells-passing-self/chatgpt.png)

Wow, I couldn't have put it better myself. In fact, I literally couldn't because I wrote this whole blog post which can be entirely summated in that single sentence above.

In conclusion, please don't pass `self` to objects unless you _really_ know what you're doing.

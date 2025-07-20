---
title: "Log by Time, not by Count"
description: "By default, log based on fixed time intervals rather than number of messages."
date: "2025-07-20"
tags: ["Programming"]
---

"How to Log" is a surprisingly deep topic in software engineering with many different viewpoints, and they're almost all valid in different situations. I'm going to argue that when processing lots of events, it's best to log every X seconds, rather than every X messages. This is a simple concept, but I've never seen it written down before.

Let's quickly look at some pseudocode to understand what I mean.

**Count-based logging**

```python
num_events_processed = 0

while True:
    event = read_event_from_queue()
    process_event(event)
    num_events_processed += 1

    if num_events_processed % 1_000 == 0:
        module_logger.info("Processed 1000 events.")
```

**Time-based logging**

```python
last_time_logged = time.time()
num_events_processed_since_last_log = 0

while True:
    event = read_event_from_queue()
    process_event(event)
    num_events_processed_since_last_log += 1

    current_time = time.time()
    if current_time - last_time_logged >= 1.0:
        module_logger.info(f"Processed {num_events_processed_since_last_log} events.")
        num_events_processed_since_last_log = 0
        last_time_logged = current_time
```

Default to writing time based logging.

## Log rate should be consistent

If you log too much:

- Time spent logging is time you aren't spending processing events. You slow your system down when it's at peak load.
- Lots of useless logs are costly to consume and retain.
- Lots of useless logs slow down searching through the logs, reducing observability.

And if you don't log enough:

- You might not know if your application is even running!
- Low observability.

The problem with logging every X messages is that there isn't a good value for X. Your application might process millions of messages per second in production, but only ~5 each second when running locally for testing. You should emit logs at a constant rate in both these cases, and time-based logging provides that.

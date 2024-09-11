---
title: "Downloading all your Facebook messages"
description: "A guide on how to download all your Facebook messages for storage or analysis"
date: "2024-09-11"
---

## Summary

At the time of writing, there is a bug when downloading all your old Facebook messages if you select too-large of a date range. (Like "All Time" for example). If a large date range is selected, you'll download all the media _in_ the messages, but not actually the messages themselves. You'll only get the messages themselves if you download smaller date ranges.

More specifically: From trial and error, it seems that if you attempt to download enough data that Facebook breaks the download up into multiple chunks, the messages are missing. If you only get a single download link, the messages seem to be there.

There are also two places to download message data now, since Facebook went through their big E2E encryption upgrade around January 2024. Depending on if you want pre or post-2024 messages, you need to go via two different places.

## The actual post

I enjoy looking at data, and Facebook allows you to download many different types of data back from them. This guide was written in 2024, and most likely will not be updated, so if you're arriving from the future, take it with a grain of salt, and possibly consider looking at [Facebook's Own Documentation](https://www.facebook.com/help/messenger-app/212802592074644) about how to do this.

It seems like Facebook's big rollout of E2E encryption makes things a little more complex here, because now there are two ways to download all your messages:

### Old Pre-E2E Encrypted Messages

To start with, follow Facebook's instructions:

1. On facebook.com, click on your profile picture in the top right, then click **Settings and privacy**.
2. Click **Settings**.
3. Click **Accounts Centre**, then click **Your information and permissions**.
4. Click **Download your information**.
5. Click **Download or transfer information**.
6. Select the profiles that you'd like to download information from.
7. Click **Next**.

Facebook's documentation actually works this far, so I've honestly just copied the above from their docs. Now it gets a little harder:

![A dialog box saying: "How much information do you want?" with options for available information, and specific types of information](/images/blog/downloading-facebook-message-data/information_type.png)

8. Here we want to select "Specific types of information" because we just want message data.

![Another dialog box with options. Only the "Messages" option is ticked.](/images/blog/downloading-facebook-message-data/specific_information.png)

9. Don't bother looking at any other options, you just want to download messages.
10. Select whether you want to download it, or transfer it to destination. I assume if you're a regular user like myself, you probably just want to download it to your computer, so select _Download to device_.

![A box full of options including the "date range" option.](/images/blog/downloading-facebook-message-data/date_range.png)

11. Next, when you're selecting the date range, **don't** select the "All Time" option, even if you want to download all your data. Start with something smaller like 1 week if you want data immediately, or 3 years if you want something substantial. There currently seems to be a bug when trying to download all your Facebook messages, where if you select too-large of a time range (like "All Time" for example) you'll download all the media _in_ the messages, but not actually the messages themselves. You'll only get the messages themselves if you download smaller date ranges. More specifically: From trial and error, it seems that if you attempt to download enough data that Facebook breaks the download up into multiple chunks, the messages are missing. If you only get a single download link, the messages seem to be there.

I'd also highly recommend downloading a week's worth of data first, because:

- You're only allowed to make one request per account at a time, and requests take a while to fulfill. In my experience, a weeks worth of data is supplied within the hour, but 3 years worth can take 1.5 days.
- This initial 1 week of data can give you something to explore before you start downloading everything else.

#### Alright so I have my data, what the heck am I looking at:

Now that you've got your data, you should have something that looks like this:

```text
your_facebook_activity/
└── messages/
    ├── archived_threads/
    │   ├── personA_hash/
    │   │   └── message_1.json
    │   ├── personB_hash/
    │   │   └── message_1.json
    │   ├── personC_hash/
    │   │   └── ...
    │   └── ...
    ├── e2ee_cutover/
    │   ├── personD_hash/
    │   │   ├── files/
    │   │   │   └── files...
    │   │   ├── photos/
    │   │   │   └── photos...
    │   │   └── message_1.json
    │   └── ...
    ├── inbox/
    │   ├── personE_hash/
    │   │   ├── files/
    │   │   │   └── files...
    │   │   ├── photos/
    │   │   │   └── photos...
    │   │   └── message_1.json
    │   └── ...
    ├── autofill_information.json
    ├── messenger_contacts_you've_blocked.json
    ├── secret_conversations.json
    ├── your_cross-app_messaging_settings.json
    ├── your_responsiveness_in_messaging.json
    └── ...
```

You'll generally be able to find the message logs in the either the e2ee_cutover directory, or the inbox directory.

### Recent Encrypted Messages

This time, I recommend fully following [Facebook's Official Docs](https://www.facebook.com/help/677912386869109/) for this, because this site won't be kept up-to-date, and they actually work this time. If you follow them correctly, you'll find yourself with zip file containing something like this:

```text
messages/
├── media/
│   └── ...
├── personA_randomNumber.json
├── personB_randomNumber.json
└── ...
```

And you'll be able to find the conversion you need pretty easily.

## JSON Format

Very inconveniently, the JSON message formats between old messages and new ones have changed, which makes parsing them a tiny bit harder.

### Older message format

```json
    {
      "sender_name": "Person A",
      "timestamp_ms": 1709878199932,
      "content": "Howdy Partner",
      "reactions": [],
      "is_geoblocked_for_viewer": false
    },
```

### Encrypted message format

```json
{
  "isUnsent": false,
  "media": [],
  "reactions": [],
  "senderName": "Person A",
  "text": "Hello",
  "timestamp": 1707091195935,
  "type": "text"
}
```

But if you're reading this, I'm sure it's nothing you can't handle.

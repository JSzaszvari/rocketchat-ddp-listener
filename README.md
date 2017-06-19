# Rocket.Chat DDP Listener Example

## Summary

**This is a example script written using NodeJS that connects to Rocket.Chat's Real Time API using Meteor's DDP (Distributed Data Protocol) and listens to a Channel/Room.**

With the Rocket.Chat Real Time API you can "Subscribe" to events to get a "Real Time Stream" of actions/messages.

The following example subscribes to a private or public channel and listens for all messages posted and displays them in real time.

The DDP protocol is commonly used to write custom chat clients for Meteor based apps (Or anything that requires a real time stream of messages to be received)

## node-ddp-client

This script utilises the [node-ddp-client package](https://github.com/oortcloud/node-ddp-clien) and [ddp-login package](https://github.com/vsivsi/ddp-login) to talk to Rocket.Chat using it's Real-Time API.

Please see those repositories on how to expand/build on what I have provided as this is just a simple example.

## Getting Started with this script

First, We need a valid **authToken** so we can authenticate and we will also need the '_id' of the channel/group that we want to listen into.

### Obtaining the authToken

First, obtain a **authToken** from the standard Rocket.Chat API.

These do not expire, So once generated you are good for as long as you need it for - You can get a **authToke**n using the Standard (Not Real-time API) using the following curl command:

        curl -X "POST" "https://chat.myserver.com/api/v1/login" \
        -H "Content-Type: application/json; charset=utf-8" \
        -d $'{
        "username": "my_username",
        "password": "my_password"
        }'
You will get a response like this. Take note of the **authToken** and **userId** as we will need this:

        {
        "status": "success",
        "data": {
        "authToken": "HSus82-hkmVAy-gECPS-QT5G0sCISSWzEEpfA7JybCv",
        "userId": "uJK8DarWEz4KXywZrJ"
        }

Take note of the authToken and userID as we will use these to obtain the ID of the Group/Channel we are going to subscribe too.

### Obtaining the ID of a Group/Channel

We need the obtain the "_id" of the Group or Channel that we want to subscribe too. This is also done through the standard Rocket.Chat REST API.

A **Channel** is a private/locked room that is invite only and a **Room** is a public channel that anyone can join.

You can get the "_id" for a Channel with the API **'channels.list'** API call, and for a Room with the API **'rooms.list'** API call.

Use the curl commands below to get a list of the Channels/Room and find the '_id' parameter for the one you need

#### Get Full Channel List

Request:

```bash
curl "https://chat.myserver.com/api/v1/channels.list" \
     -H "X-User-Id: uJK8DarWEz4KXywZrJJ" \
     -H "X-Auth-Token: HSus82-hkmVAy-gECPS-QT5G0sCISSWzEEpfA7JybCv" \
     -H "Content-Type: application/x-www-form-urlencoded; charset=utf-8"
```

Response:

```json
{
  "channels": [
    {
      "_id": "LakQFGoB7FuTm8Fm5",
      "name": "channel-name",
      "t": "c",
      "msgs": 354,
      ....
}
```

#### Get Full Group List

Request:

```bash
curl "https://chat.myserver.com/api/v1/groups.list" \
     -H "X-User-Id: uJK8DarWEz4KXywZrJJ" \
     -H "X-Auth-Token: HSus82-hkmVAy-gECPS-QT5G0sCISSWzEEpfA7JybCv" \
     -H "Content-Type: application/x-www-form-urlencoded; charset=utf-8"
```

Response:

```json
 {
      "_id": "CYSvXNdL7BxKncB4S",
      "name": "my-super-group",
      "t": "p",
      "msgs": 7335,
      .....
 }
 ```


## Running the script

1. Clone the git repo

        git clone https://github.com/jszaszvari/rocketchat-ddp-listener.git
1. Go into the repo we just cloned

        cd rocketchat-ddp-listener
1. Use NPM to install any needed dependancies that the script requires:

        npm install
1. Edit the 'listen_to_room.js' script and fill in the 'authToken' and 'subscription' variables (See the 'Getting a authToken and roomId' section above if you need help with this)

## More info on the Rocket.Chat Real-time API

Note: The Real Time API in Rocket.Chat is based on a unreleased version of the API.

The Real-time API is composed of two elements: Method Calls and Subscriptions.

Method calls are used to trigger actions based on the passed data.

Streams are the way to plug into a continuous source of updates (changes). Any subscriber registered will receive the latest changes as they happen in real-time.

See more info on the RealTime API at the following

<https://rocket.chat/docs/developer-guides/realtime-api/>

<https://rocket.chat/docs/developer-guides/realtime-api/method-calls/>

<https://rocket.chat/docs/developer-guides/realtime-api/subscriptions/>
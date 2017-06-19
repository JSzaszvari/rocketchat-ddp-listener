/**
 * Subscribes and listens to the Real Time stream of all messages happening in a Rocket.Chat Channel/Room
 *
 * Written by John Szaszvari <jszaszvari@gmail.com> 
 * Git Repo:  https://github.com/jszaszvari/rocketchat-ddp-listener 
 * 
 */

//Fill out the 4 variables below

//Address of the Rocket.Chat server you want to connect to
var server = "chat.mydomain.com";

//Port of the Rocket.Chat server.
var serverPort = 443;

//authToken that we got from the Rocket.Chat API
var authToken = "my_auth_token";

//The _id of the channel or group you want to listen too. See the README 
var subscribe = "group_or_channel_id";

//End of user defined variables

var DDP = require("ddp");
var login = require("ddp-login");
process.env.METEOR_TOKEN = authToken;

var ddpClient = new DDP({
  host: server,
  port: serverPort, 
  maintainCollections: true

});

ddpClient.connect(function(err) {
  if (err) throw err;

  login(ddpClient, {
    env: "METEOR_TOKEN",
    method: "token",
    retry: 5
  },

  function(error, userInfo) {
    if (error) {
      // Something went wrong... 
    } else {
      // We are now logged in, with userInfo.token as our session auth token. 
      token = userInfo.token;
      console.log("Authentication Sucessful.\n");

      // Subscribe to a message stream from a channel or group
      console.log("Attempting to subscribe to the Group/Channel now.\n");
      ddpClient.subscribe("stream-room-messages", [subscribe, false], function() {
        console.log(ddpClient.collections);
        console.log("Subscription Complete.\n");


        // Display the stream on console so we can see its working
        console.log("\nStarting live-stream of messages.:\n");
        ddpClient.on("message", function(msg) {
          console.log("Subscription Msg: " + msg);
        });
      }

      );
    }
  });
});
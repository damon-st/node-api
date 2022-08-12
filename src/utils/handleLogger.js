const { IncomingWebhook } = require("@slack/webhook");
const webHook = new IncomingWebhook(process.env.SLACK_WEB_HOOK);

const loggetStream = {
  write: (message) => {
    webHook.send({
      text: message,
    });
  },
};
module.exports = loggetStream;

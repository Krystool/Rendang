const RendangClient = require('./handle/RendangClient');
const client = new RendangClient({
  fetchAllMembers: true,
  disabledEvents: ["TYPING_START", "USER_NOTE_UPDATE"],
  disableEveryone: true
});

require('./handle/events')(client);
require('./handle/module')(client);

bot.login(process.env.BOT_TOKEN);

const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'spotify',
  description: 'recherche les musiques que tu veux à l aide de leur titre.',
  usage: 'spotify [nom de la musique]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    try {
      const { data } = await axios.get(`https://hiroshi-api.onrender.com/tiktok/spotify?search=${encodeURIComponent(args.join(' '))}`);
      const link = data[0]?.download;

      sendMessage(senderId, link ? {
        attachment: { type: 'audio', payload: { url: link, is_reusable: true } }
      } : { text: 'Sorry, no Spotify link found for that query.' }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Oups quelque chose s'est mal passé... veuillez réessayer dans un instant.' }, pageAccessToken);
    }
  }
};
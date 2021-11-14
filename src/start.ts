/**
 * This function is called to start the server.
 */

import Server from './SERVICE/Server/Server';

const start = async () => {
  await Server();
};

start()
  .then((result) => console.log(`app is running - ${result}`))
  .catch((err) => console.error(err));

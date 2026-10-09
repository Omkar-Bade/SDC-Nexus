import app from './app';
import { config } from './config';

const server = app.listen(config.port, () => {
  console.log(`[SDC Nexus Backend] Server running on port ${config.port} (${config.nodeEnv} mode)`);
  console.log(`[SDC Nexus Backend] Health check: http://localhost:${config.port}/api/health`);
});

export default server;

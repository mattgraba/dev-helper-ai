// cli/utils/getToken.js
const fs = require('fs');
const path = require('path');
const os = require('os');

function getToken() {
  const file = path.join(os.homedir(), '.dev-helper', 'config.json');
  if (!fs.existsSync(file)) return null;

  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return data.token || null;
  } catch (err) {
    console.error('⚠️ Failed to parse config file:', err.message);
    return null;
  }
}

module.exports = getToken;
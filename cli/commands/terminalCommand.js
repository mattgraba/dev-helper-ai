const axios = require('axios');
const chalk = require('chalk');
const { scanFiles } = require('../utils/fileScanner');

async function handleTerminalBasic({ goal, context }) {
  try {
    const res = await axios.post('http://localhost:3001/terminal', {
      goal,
      context,
    });

    let { commands } = res.data;
    if (!commands) throw new Error('No terminal commands returned from /terminal');

    commands = commands.replace(/```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();

    console.log(chalk.green('\n💻 Suggested terminal commands:\n'));
    console.log(commands);
  } catch (err) {
    console.error(chalk.red('❌ Failed to generate terminal commands.'));
    console.error(err.response?.data || err.message);
  }
}

async function handleTerminalWithContext({ goal, context }) {
  try {
    const contextFiles = await scanFiles({
      directory: process.cwd(),
      extensions: ['js', 'ts', 'json'],
      maxFileSizeKB: 100,
    });

    const res = await axios.post('http://localhost:3001/terminal', {
      goal,
      context,
      contextFiles,
    });

    let { commands } = res.data;
    if (!commands) throw new Error('No terminal commands returned from /terminal');

    commands = commands.replace(/```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();

    console.log(chalk.green('\n💻 Suggested terminal commands with project context:\n'));
    console.log(commands);
  } catch (err) {
    console.error(chalk.red('❌ Failed to generate terminal commands with context.'));
    console.error(err.response?.data || err.message);
  }
}

module.exports = {
  handleTerminalBasic,
  handleTerminalWithContext,
};

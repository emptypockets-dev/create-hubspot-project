import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--boilerplate': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-b': '--boilerplate',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    boilerplate: args['--boilerplate'] || false,
    template: 'javascript',
    runInstall: args['--install'] || false,
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'javascript';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Should a git be initialized?',
      default: true,
    });
  }

  if (!options.boilerplate) {
    questions.push({
      type: 'confirm',
      name: 'boilerplate',
      message:
        'Do you want to use the HubSpot CMS boilerplate as a starting point?',
      default: true,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: 'javascript',
    git: options.git || answers.git,
    boilerplate: options.boilerplate || answers.boilerplate,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}

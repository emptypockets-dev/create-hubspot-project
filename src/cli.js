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
    template: args._[0],
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
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['javascript', 'typescript'],
      default: defaultTemplate,
    });
  }
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Do you want to initialize an empty Git repo?',
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
    template: options.template || answers.template,
    git: options.git || answers.git,
    boilerplate: options.boilerplate || answers.boilerplate,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}

import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import gitignore from 'gitignore';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { projectInstall } from 'pkg-install';
import { promisify } from 'util';
import figlet from 'figlet';

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

async function createGitignore(options) {
  const file = fs.createWriteStream(
    path.join(options.targetDirectory, '.gitignore'),
    { flags: 'a' }
  );
  return writeGitignore({
    type: 'Node',
    file: file,
  });
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initalize git'));
  }
  return;
}

async function addToGitignore(options) {
  const targetPath = path.join(options.targetDirectory, '.gitignore');
  const ignoreContent = `# HubSpot
hubspot.config.yml

# Node
node_modules
`;
  return writeFile(targetPath, ignoreContent, 'utf8');
}

async function initHubspotBoilerplate(options) {
  const result = await execa('npm', ['run', 'boilerplate'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initalize HubSpot boilerplate'));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
    email: 'andrey@fasterbetter.dev',
    name: 'Andrey Kondratyuk',
  };

  const fullPathName = new URL(import.meta.url).pathname;
  const templateDir = path.normalize(
    fullPathName.substr(fullPathName.indexOf('/')),
    '../../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: 'Copy project files',
        task: () => copyTemplateFiles(options),
      },
      {
        title: 'Initialize empty Git repo',
        task: () => initGit(options),
        enabled: () => options.git,
      },
      {
        title: 'Create .gitignore file',
        task: () => createGitignore(options),
        enabled: () => options.git,
      },
      {
        title: 'Ignore Hubspot config files in Git',
        task: () => addToGitignore(options),
        enabled: () => options.git,
      },
      {
        title: 'Build HubSpot CMS boilerplate in /src',
        task: () => initHubspotBoilerplate(options),
        enabled: () => options.boilerplate,
      },
      {
        title: 'Install dependencies',
        task: () =>
          projectInstall({
            cwd: options.targetDirectory,
          }),
        skip: () =>
          !options.runInstall
            ? 'Pass --install to automatically install dependencies'
            : undefined,
      },
    ],
    {
      exitOnError: false,
    }
  );

  await tasks.run();
  console.log(chalk.green.bold('Your HubSpot project is ready!'));
  console.log(chalk.blue.bold('-------------'));
  console.log(chalk.blue.bold('To finish your unique setup:'));
  console.log(chalk.blue.bold('-------------'));
  console.log(
    chalk.blue("1. run 'hs init' to connect your local folder to HubSpot")
  );
  console.log(
    chalk.blue("2. update 'templates/layout/base.html' to include `styles.css`")
  );
  console.log(
    chalk.blue(
      "3. 'import ./module.css' in 'module.js' files to use PostCSS features"
    )
  );
  console.log(
    chalk.blue(
      '4. update your HubSpot theme folder name in `webpack.config.js`'
    )
  );

  return true;
}

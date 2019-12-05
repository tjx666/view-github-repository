import viewActiveEditorRepository from './viewActiveEditorRepository';
import viewPackageJSONRepository from './viewPackageJSONRepository';

const commands = [viewActiveEditorRepository, viewPackageJSONRepository];
commands.forEach(command => {
    command.identifier = `viewGithubRepository.${command.identifier}`;
});

export default commands;

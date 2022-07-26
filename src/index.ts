import selectToTheBeginning from './commands/select-to-beginning'
import selectToTheEnd from './commands/select-to-the-end'
import selectTheFirst from './commands/select-the-first'
import selectTheLast from './commands/select-the-last'
import expandBackward from './commands/expand-backward'
import expandForward from './commands/expand-forward'

try {
    switch (figma.command) {
        case 'select-to-the-beginning':
            selectToTheBeginning()
            break

        case 'select-to-the-end':
            selectToTheEnd()
            break

        case 'select-the-first':
            selectTheFirst()
            break

        case 'select-the-last':
            selectTheLast()
            break

        case 'expand-backward':
            expandBackward()
            break

        case 'expand-forward':
            expandForward()
            break
    }
    figma.closePlugin()

} catch (e) {
    figma.closePlugin(e.message)
}
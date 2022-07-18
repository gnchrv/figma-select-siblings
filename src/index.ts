import selectToTheBeginning from './select-to-beginning'
import selectToTheEnd from './select-to-the-end'
import selectTheFirst from './select-the-first'
import selectTheLast from './select-the-last'
import expandBackward from './expand-backward'
import expandForward from './expand-forward'

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
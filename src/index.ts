import selectToTheBeginning from './select-to-beginning'
import selectToTheEnd from './select-to-the-end'
import selectTheFirst from './select-the-first'
import selectTheLast from './select-the-last'
import expandBackward from './expand-backward'
import expandForward from './expand-forward'

if (figma.command == 'select-to-the-beginning') {
    selectToTheBeginning()
    figma.closePlugin()
}

if (figma.command == 'select-to-the-end') {
    selectToTheEnd()
    figma.closePlugin()
}

if (figma.command == 'select-the-first') {
    selectTheFirst()
    figma.closePlugin()
}

if (figma.command == 'select-the-last') {
    selectTheLast()
    figma.closePlugin()
}

if (figma.command == 'expand-backward') {
    expandBackward()
    figma.closePlugin()
}

if (figma.command == 'expand-forward') {
    expandForward()
    figma.closePlugin()
}
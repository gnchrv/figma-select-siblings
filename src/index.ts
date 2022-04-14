import selectToTheBeginning from './select-to-beginning'
import selectToTheEnd from './select-to-the-end'
import selectTheFirst from './select-the-first'
import selectTheLast from './select-the-last'

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

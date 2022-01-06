import selectUp from './select-up'
import selectDown from './select-down'
import selectFirst from './select-first'
import selectLast from './select-last'

if (figma.command == 'select-up') {
    selectUp()
    figma.closePlugin()
}

if (figma.command == 'select-down') {
    selectDown()
    figma.closePlugin()
}

if (figma.command == 'select-first') {
    selectFirst()
    figma.closePlugin()
}

if (figma.command == 'select-last') {
    selectLast()
    figma.closePlugin()
}

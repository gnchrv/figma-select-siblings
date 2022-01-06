import selectUp from './select-up'
import selectDown from './select-down'
import selectFirst from './select-first'

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

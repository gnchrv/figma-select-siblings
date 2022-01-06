import selectUp from './select-up'
import selectDown from './select-down'

if (figma.command == 'select-up') {
    selectUp()
    figma.closePlugin()
}

if (figma.command == 'select-down') {
    selectDown()
    figma.closePlugin()
}

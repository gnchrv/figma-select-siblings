import { selectUp, selectDown } from "./lib"

if (figma.command == 'select-up') {
    selectUp()
    figma.closePlugin()
}

if (figma.command == 'select-down') {
    selectDown()
    figma.closePlugin()
}

import selectToTheBeginning from './select-to-beginning'
import selectToTheEnd from './select-to-the-end'
import selectTheFirst from './select-the-first'
import selectTheLast from './select-the-last'
import expandBackward from './expand-backward'
import expandForward from './expand-forward'

if (figma.command == 'select-to-the-beginning') {
    try {
        selectToTheBeginning()
        figma.closePlugin()
    } catch (e) {
        figma.closePlugin(e.message)
    }
}

if (figma.command == 'select-to-the-end') {
    try {
        selectToTheEnd()
        figma.closePlugin()
    } catch (e) {
        figma.closePlugin(e.message)
    }
}

if (figma.command == 'select-the-first') {
    try {
        selectTheFirst()
        figma.closePlugin()
    } catch (e) {
        figma.closePlugin(e.message)
    }
}

if (figma.command == 'select-the-last') {
    try {
        selectTheLast()
        figma.closePlugin()
    } catch (e) {
        figma.closePlugin(e.message)
    }
}

if (figma.command == 'expand-backward') {
    try {
        expandBackward()
        figma.closePlugin()
    } catch (e) {
        figma.closePlugin(e.message)
    }
}

if (figma.command == 'expand-forward') {
    try {
        expandForward()
        figma.closePlugin()
    } catch (e) {
        figma.closePlugin(e.message)
    }
}
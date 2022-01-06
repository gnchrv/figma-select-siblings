import {getNodesParents, isDocumentNode} from './lib'

/**
 * Добавляет к выделению элементы, визуально лежащие ниже (правее) выбранных
 */
export default function selectDown() {
    // Получаем набор выделенных элементов
    let selection = figma.currentPage.selection

    // Если не выбрано ни одного элемента, выходим
    if (!selection.length) return

    // Получаем набор родителей выбранных элементов
    const parents = getNodesParents(selection)

    // Создаём заготовку, в которую будем добавлять элементы, которые необходимо выделить
    const elementsToSelect: SceneNode[] = []

    // Проходимся по каждому родителю
    for (const parent of parents) {

        /*
         Проверяем, не является родитель — целым документом (в этом случае его дети — страницы, их нельзя выделять). На практике такое невозможно, потому что родственники выделенного элемента не могут являться страницами (а их родитель, соответственно, — документом). Но иначе ругается TS-компилятор
        */
        if (isDocumentNode(parent)) continue

        // Получаем список детей (братьев-сестёр для выделенного элемента)
        const siblings = parent.children

        /*
         Ищем индекс первого, согласно АПИ Фигмы, дочернего элемента, который при этом входит в список выделенных блоков. В вертикальном auto-layout-стэке это будет элемент, визуально лежищий выше всех.
         */
        const i = siblings.findIndex(sibling => selection.includes(sibling))

        // Добавляем к итоговому выделению базовый элемент и его братьев-сестёр, идущих после него (визуально лежащих ниже / правее)
        elementsToSelect.push(...siblings.slice(i))
    }

    // Просим Фигму выделить собранные элементы
    figma.currentPage.selection = elementsToSelect
}
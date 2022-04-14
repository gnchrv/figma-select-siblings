import { getNodesParents, isDocumentNode } from './lib'

/**
 * Выделяет визуально первые элементы в контейнерах с авто-лейаутом
 */
export default function selectTheFirst() {
    // Получаем набор выделенных элементов
    let selection = figma.currentPage.selection

    // Если не выбрано ни одного элемента, выходим
    if (!selection.length) return

    // Создаём заготовку для элементов, которые будет необходимо выделить
    const elementsToSelect: SceneNode[] = []

    // Собираем список родителей для выделенных элементов
    const parents = getNodesParents(selection)

    // Пробегаемся по списку родителей
    for (const parent of parents) {

        /*
         Проверяем, не является родитель — целым документом (в этом случае его дети — страницы, их нельзя выделять). На практике такое невозможно, потому что родственники выделенного элемента не могут являться страницами (а их родитель, соответственно, — документом). Но иначе ругается TS-компилятор
        */
        if (isDocumentNode(parent)) continue

        // Получаем первый элемент в списке (визуально он тоже будет первым, но в иерархии слоёв — последним)
        const firstElement = parent.children[0]

        // Добавляем его в список элементов для выделения
        elementsToSelect.push(firstElement)
    }

    // Выделяем выбранные элементы
    figma.currentPage.selection = elementsToSelect
}
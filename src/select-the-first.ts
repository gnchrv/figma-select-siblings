import { getNodesParents } from './lib'

/**
 * Выделяет первые элементы в контейнерах с авто-лейаутом
 */
export default function selectTheFirst() {
    // Получаем набор выделенных элементов
    let { selection } = figma.currentPage

    // Если не выбрано ни одного элемента, выходим
    if (!selection.length) throw new Error('Select at least one element')

    // Создаём заготовку для элементов, которые будет необходимо выделить
    const elementsToSelect: SceneNode[] = []

    // Собираем список родителей выделенных элементов
    const parents = getNodesParents(selection)

    // Пробегаемся по списку родителей
    for (const parent of parents) {

        // Получаем первый элемент в списке (визуально он тоже будет первым, но в панеле слоёв — последним)
        const firstElement = parent.children[0]

        // Добавляем его в список элементов для выделения
        elementsToSelect.push(firstElement)
    }

    // Выделяем выбранные элементы
    figma.currentPage.selection = elementsToSelect
}
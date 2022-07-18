import { getNodesParents } from './lib'

/**
 * Выделяет последние элементы в контейнерах с авто-лейаутом
 */
export default function selectTheLast() {
    // Получаем набор выделенных элементов
    let { selection } = figma.currentPage

    // Если не выбрано ни одного элемента, выходим
    if (!selection.length) throw new Error('Select at least one element')

    // Создаём заготовку для элементов, которые нужно будет выделить
    const elementsToSelect: SceneNode[] = []

    // Собираем список родителей выделенных элементов
    const parents = getNodesParents(selection)

    // Пробегаемся по списку родителей
    for (const parent of parents) {

        // Получаем последний элемент в списке (визуально он тоже будет последним, но в панеле слоёв — первым)
        const firstElement = parent.children.slice(-1)[0]

        // Добавляем его в список элементов для выделения
        elementsToSelect.push(firstElement)
    }

    // Выделяем выбранные элементы
    figma.currentPage.selection = elementsToSelect
}
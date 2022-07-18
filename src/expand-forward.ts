import { NothingSelectedError } from "./errors"

/**
 * Добавляет к выделению следующий элемент
 */
export default function expandForward() {
    // Получаем набор выделенных элементов
    let { selection } = figma.currentPage

    // Если не выбрано ни одного элемента, выходим
    if (!selection.length) throw new NothingSelectedError()

    // Создаём заготовку для элементов, которые нужно будет выделить
    const elementsToSelect: SceneNode[] = []

    // Пробегаемся по выделенным слоям
    for (const node of selection) {

        // Получаем идентификатор элемента
        const { id } = node

        // Получаем индекс элемента в стэке
        const i = node.parent.children
            .map(node => node.id)
            .indexOf(id)

        // Получаем индекс следующего элемента
        const j = i + 1

        // Проверяем, валидный ли индекс. Если нет — переходим к следующему элементу
        if (j < 0 || j > node.parent.children.length - 1) continue

        // Если всё в порядке, добавляем к новому выделению и текущий элемент, и предшествующий ему
        elementsToSelect.push(node)
        elementsToSelect.push(node.parent.children[j])
    }

    // Выделяем выбранные элементы
    figma.currentPage.selection = elementsToSelect
}
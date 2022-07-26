import { NothingSelectedError } from '../errors'
import { getNodesParents } from '../lib'

/**
 * Selects all the elements in a stack located between the two that has been selected. If there are more than two selected elements in a stack, the function picks two elements with the greatest number of nodes between them.
 */
export default function selectBetween() {
    // Получаем набор выделенных элементов
    let { selection } = figma.currentPage

    // Если не выбрано ни одного элемента, выходим
    if (selection.length < 2) throw new NothingSelectedError('Select at least 2 elements 👀')

    // Получаем набор родителей выбранных элементов
    const parents = getNodesParents(selection)

    // Создаём заготовку, в которую будем добавлять элементы, которые нужно будет выделить
    const elementsToSelect: SceneNode[] = []

    // Проходимся по каждому родителю
    for (const parent of parents) {

        // Получаем список детей (братьев-сестёр для выделенного элемента)
        const siblings = parent.children

        /*
         Ищем индекс первого, согласно АПИ Фигмы, дочернего элемента, который при этом входит в список выделенных блоков. В вертикальном auto-layout-стэке это будет элемент, визуально лежищий выше всех.
         */
         const firstIndex = siblings.findIndex(sibling => selection.includes(sibling))

        /*
         Ищем индекс последнего, согласно АПИ Фигмы, дочернего элемента, который при этом входит в список выделенных блоков. В вертикальном auto-layout-стэке это будет элемент, визуально лежищий ниже всех.

         Проверяем элементы на присутствие в выделении, переводим массив в набор булевых значений и находим последнее true.

         (Аналогично, можно было бы воспользоваться `reverse().findIndex(sibling => ...)`. Решение взято отсюда: https://stackoverflow.com/questions/33268863/find-last-matching-object-in-array-of-objects/49199917#49199917)
         */
        const lastIndex = siblings
            .map(sibling => selection.includes(sibling))
            .lastIndexOf(true)

        // Добавляем к итоговому выделению базовый элемент и его братьев-сестёр, идущих до него (визуально лежащих выше / левее)
        elementsToSelect.push(...siblings.slice(firstIndex, lastIndex + 1))
    }

    // Просим Фигму выделить собранные элементы
    figma.currentPage.selection = elementsToSelect
}
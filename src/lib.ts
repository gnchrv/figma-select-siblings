/**
 * Составляет набор родителей для списка элементов. Родители в списке не повторяются
 * @param nodes { readonly SceneNode[] } Список элементов, для каждого из которых нужно найти родителя
 * @returns {Set<BaseNode & ChildrenMixin>} Набор родителей
 */
export function getNodesParents(nodes: readonly SceneNode[]): Set<BaseNode & ChildrenMixin> {

    // Создаём заготовку, в которую будем добавлять найденных родителей
    const parents = new Set<BaseNode & ChildrenMixin>()

    // Пробегаемся по каждому из элементов
    for (const node of nodes) {
        
        // Находим родителя
        const parent = node.parent

        // Если такой родитель уже есть в регистре, переходим к следующему выделенному элементу
        if (parents.has(parent)) continue

        // Если такого родителя ещё нет, добавляем его
        parents.add(parent)
    }

    // Возвращаем массив родителей
    return parents
}

/**
 * Проверяет, не является ли элемент целым документом
 * @param {BaseNode} node Проверяемый элемент
 * @returns {node is DocumentNode} Результат проверки
 */
export function isDocumentNode(node: BaseNode): node is DocumentNode {
    return node.type === 'DOCUMENT'
}
/**
 * Составляет набор родителей для списка элементов. Родители в списке не повторяются
 * @param nodes { readonly SceneNode[] } Список элементов, для каждого из которых нужно найти родителя
 * @returns {Set<(SceneNode | PageNode) & ChildrenMixin>} Набор родителей
 */
export function getNodesParents(nodes: readonly SceneNode[]): Set<(SceneNode | PageNode) & ChildrenMixin> {

    // Создаём заготовку, в которую будем добавлять найденных родителей. Они будут являться элементами, располагающимися на холсте, или страницами. Также для компилятора нужно явно указать, что у них могут быть дети
    const parents = new Set<(SceneNode | PageNode) & ChildrenMixin>()

    // Пробегаемся по каждому из элементов
    for (const node of nodes) {

        /* 
        Проверяем, не является ли родитель элемента целым документом. В этом случае сам элемент — страница и его нельзя выделить.
    
        На практике это невозможно, потому что функция получает на вход набор SceneNode — элементов, которые располагаются на холсте. Их родителями могут быть либо другие SceneNode, либо PageNode. Но никак не документ в целом.
        
        Однако пропустить эту проверку нельзя. По умолчанию родитель любого SceneNode имеет тип <BaseNode & ChildrenMixin>, а BaseNode, в свою очередь, включает в себя DocumentNode. Поэтому, если такую проверку не сделать, TS-компилятор будет ругаться.

        Итого: если родитель выделенного элемента — целый документ, пропускаем его.
    */
        if (isDocumentNode(node.parent)) continue

        // Выносим родителя в отдельную переменную
        const parent: (SceneNode | PageNode) & ChildrenMixin = node.parent

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
function isDocumentNode(node: BaseNode): node is DocumentNode {
    return node.type === 'DOCUMENT'
}
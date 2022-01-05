/**
 * Составляет набор родителей для списка элементов. Родители в списке не повторяются
 * @param nodes { readonly SceneNode[] } Список элементов, для каждого из которых нужно найти родителя
 * @returns {Set<BaseNode & ChildrenMixin>} Набор родителей
 */
function getNodesParents(nodes: readonly SceneNode[]): Set<BaseNode & ChildrenMixin> {

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
function isDocumentNode(node: BaseNode): node is DocumentNode {
    return node.type === 'DOCUMENT'
}

export function selectUp() {
    // Получаем набор выделенных элементов
    let selection = figma.currentPage.selection

    // Если не выбрано ни одного элемента, выходим
    if (!selection.length) return

    // Создаём заготовку, в которую будем добавлять родителей выделенных элементов
    const parents = new Set<BaseNode & ChildrenMixin>()

    // Создаём заготовку, в которую будем поэтапно добавлять элементы, которые необходимо выделить
    const resultSelection: SceneNode[] = []

    // Пробегаемся по каждому из выделенных элементов
    for (const node of selection) {
        // Находим родителя выделенного элемента
        const parent = node.parent

        // Если такой родитель уже есть в регистре, переходим к следующему выделенному элементу
        if (parents.has(parent)) continue

        // Если такого родителя ещё нет, добавляем его
        parents.add(parent)

        // Получаем всех детей родительского элемента (всех братьев-сестёр)
        let siblings = parent.children

        // Ищем элемент, визуально лежащий ниже всего (то есть в иерархии слоёв — выше всего). Фигма возвращает список с самого нижнего элемента в иерархии — поэтому, чтобы было легче найти самый верхний элемент, переворачиваем список. Теперь порядок совпадает с визуальным представлением
        siblings = [...siblings].reverse()

        // Ищем элементы из выделения в списке детей текущего родителя. Определяем индекс блока, визуально лежащего ниже всего
        const startIndex = siblings
            .findIndex(sibling => selection.includes(sibling))

        // Добавляем к итоговому выделению базовый элемент и его братьев-сестёр, идущих после
        resultSelection.push(...siblings.slice(startIndex))
    }

    // Просим Фигму выделить элементы, которые мы определили
    figma.currentPage.selection = resultSelection
}

export function selectDown() {
        // Получаем набор выделенных элементов
        let selection = figma.currentPage.selection

        // Если не выбрано ни одного элемента, выходим
        if (!selection.length) return
    
        // Создаём заготовку, в которую будем добавлять родителей выделенных элементов
        const parents = new Set<BaseNode & ChildrenMixin>()
    
        // Создаём заготовку, в которую будем поэтапно добавлять элементы, которые необходимо выделить
        const resultSelection: SceneNode[] = []
    
        // Пробегаемся по каждому, из выделенных элементов
        for (const node of selection) {
            // Находим родителя выделенного элемента
            const parent = node.parent
    
            // Если такой родитель уже есть в регистре, переходим к следующему выделенному элементу
            if (parents.has(parent)) continue
    
            // Если такого родителя ещё нет, добавляем его
            parents.add(parent)
    
            // Получаем всех детей родительского элемента (всех братьев-сестёр)
            let siblings = parent.children
    
            // Ищем элемент, визуально лежащий ниже всего (то есть в иерархии слоёв — выше всего). Фигма возвращает список с самого нижнего элемента в иерархии — поэтому, чтобы было легче найти самый верхний элемент, переворачиваем список. Теперь порядок совпадает с визуальным представлением
            siblings = [...siblings]
    
            // Ищем в списке детей элементы из выделения. Определяем индекс блока, визуально лежащего ниже всего
            const startIndex = siblings
                .findIndex(sibling => selection.includes(sibling))
    
            // Добавляем к итоговому выделению базовый элемент и его братьев-сестёр, идущих после
            resultSelection.push(...siblings.slice(startIndex))
        }
    
        // Просим Фигму выделить элементы, которые мы определили
        figma.currentPage.selection = resultSelection
}
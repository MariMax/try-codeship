export const ACTION_REMOVE_CATEGORY = 'ACTION_REMOVE_CATEGORY';

export function removeCategoryAction(category) {
    return {
        type: ACTION_REMOVE_CATEGORY,
        categoriesIds: category.getAllIds()
    };
}
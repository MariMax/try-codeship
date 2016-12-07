export const ACTION_ADD_CATEGORY = 'ACTION_ADD_CATEGORY';

export function addCategoryAction(newCategoryTitle, parentCategory = null) {
  return {
    type: ACTION_ADD_CATEGORY,
    title: newCategoryTitle,
    parent: parentCategory

  }
}

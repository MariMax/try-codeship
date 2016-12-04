export const ACTION_SET_CATEGORIES_LIST = 'ACTION_SET_CATEGORIES_LIST';

export function setCategoriesListAction(newCategoriesList) {
  return {
    type: ACTION_SET_CATEGORIES_LIST,
    categories: newCategoriesList
  }
}

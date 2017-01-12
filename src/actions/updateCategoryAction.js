// updateCategoryAction
export const ACTION_UPDATE_CATEGORY = 'ACTION_UPDATE_CATEGORY';

export default function updateCategoryAction(newCategoryTitle, category) {
  return {
    type: ACTION_UPDATE_CATEGORY,
    title: newCategoryTitle,
    category: category
  }
}

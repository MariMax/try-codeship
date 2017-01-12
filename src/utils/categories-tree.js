export const CategoryStatus = {
  EMPTY: 1,
  COMPLETED: 1 << 1,
  UNCOMPLETED: 1 << 2
};

class CategoryWrapper {

  constructor(rawCategoryData){
    if(rawCategoryData && typeof rawCategoryData === 'object') this.setRawData(rawCategoryData);
    else this.setRawData({id: rawCategoryData});
    this.subCategories = [];
    this.tasksList = [];
    this.hiddenState = false;
  }

  setRawData(rawData){

    if(this.rawData && this.rawData.id !== rawData.id){
      throw new Error('ID of new category data not match with exist');
    }
    this.rawData = rawData;
  }

  pushSubCategory(subCategoryWrapper){
    subCategoryWrapper.parent = this;
    this.subCategories.push(subCategoryWrapper);
  }

  selectWithParents(){
    this.selected = true;
    if(this.parent) this.parent.selectWithParents();
  }

  pushTask(task){
    this.tasksList.push(task);
  }

  isStatus(statusMask){
    return !!(this.status & statusMask);
  }

  // Get category id with all subcategories ids
  getAllIds() {
    return [this.id, ...this.subCategories.map(cat => cat.getAllIds())
        .reduce((res, idsList)=>res.concat(idsList), [])];
  }


  get status(){
    if(!this.subCategories.length && !this.tasksList.length){
      return CategoryStatus.EMPTY;
    }
    if(this.tasksList.some(task => !task.done)
        || this.subCategories.some(cat => cat.isStatus(CategoryStatus.UNCOMPLETED | CategoryStatus.EMPTY))){
      return CategoryStatus.UNCOMPLETED;
    }
    return CategoryStatus.COMPLETED;
  }

  get subcategories(){
    return this.subCategories.filter(cat => !cat.hidden);
  }

  get id(){
    return this.rawData.id;
  }

  get title(){
    return this.rawData.title;
  }

  get hidden(){
    return this.hiddenState && !this.subcategories.length;
  }

  set hidden(hidden){
    this.hiddenState = hidden;
  }

  get tasks(){
    return this.tasksList;
  }
}

export default function CategoriesTree(plainCategoriesList, plainTasksList) {
  var cache = {};

  function getCategoryWrapper(categoryIdOrData){
    var category = getCategory(categoryIdOrData);
    if(!category){
      category = new CategoryWrapper(categoryIdOrData);
      cache[category.id] = category;
    }
    else if(typeof categoryIdOrData === 'object'){
      category.setRawData(categoryIdOrData);
    }
    return category;
  }

  function addTasks(tasksList){
    tasksList.forEach(task => task.categoryId && getCategory(task.categoryId).pushTask(task));
  }

  plainCategoriesList.forEach(function(cat){
    var category = getCategoryWrapper(cat);
    if(cat.parent){
      getCategoryWrapper(cat.parent).pushSubCategory(category);
    }
  });

  if(Array.isArray(plainTasksList)){
    addTasks(plainTasksList);
  }



  function getCategory(category) {
    if(typeof category === 'object') category = category.id;
    return cache[category];
  }

  this.getList = function(){
    return Object.values(cache);
  };

  this.getTree = function() {
    return this.getList().filter(function(category){
      return !category.parent && !category.hidden;
    });
  }.bind(this);

  this.selectBranch = function(category) {
    this.getList().forEach(cat => cat.selected = false);
    if(category) getCategory(category).selectWithParents();
  }.bind(this);

  this.addTasks = addTasks;
  this.getCategory = getCategory;


}




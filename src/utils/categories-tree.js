

export default function CategoriesTree(plainCategoriesList) {

  var cache = {};
  plainCategoriesList.forEach(function(cat){
    cache[cat.id] = Object.assign(cache[cat.id] || {},
                                  {
                                    id: cat.id,
                                    title: cat.title
                                  });
    if(cat.parent){
      cache[cat.parent] = cache[cat.parent] || {};
      cache[cat.id].__parentLink = cache[cat.parent];
      cache[cat.parent].subcategories = cache[cat.parent].subcategories || [];
      cache[cat.parent].subcategories.push(cache[cat.id]);
    }
  });



  function getCategory(category) {
    if(typeof category === 'object') category = category.id;
    return cache[category];
  }

  function selectBranch(cat) {
    cat.selected = true;
    if(cat.__parentLink){
      selectBranch(cat.__parentLink);
    }
  }
  
  function removeCategory(category) {
    category = getCategory(category);
    if(category.__parentLink){
      var subCats = category.__parentLink.subcategories;
      subCats.splice(subCats.indexOf(category), 1);
    }
    delete cache[category.id];
  }

  this.getTree = function() {
    return Object.values(cache).filter(function(category){
      return !category.__parentLink;
    });
  }

  this.selectBranch = function(category) {
    selectBranch(getCategory(category));
  }

  this.safeRemoveCategories = function(categoriesList) {
    categoriesList = categoriesList.map(getCategory);

    categoriesList.forEach(function(category){     
      cache[category.id].__to_remove = true;
    });

    categoriesList.forEach(function(category){
      if(!category.subcategories || category.subcategories.every(function(subCat){
        return cache[subCat.id].__to_remove;
      })){
        removeCategory(category);
      }
    });
  }        

}




// @TODO: field "subcategories" is unused now, need to remove it if this not will needed
var categoriesList = [
  {
    id: 'cat1',
    title: "Category 1"
  },
  {
    id: 'cat2',
    title: "Category 2"
  },
  {
    id: 'cat3',
    title: "Category 3"
  },
  {
    id: 'cat4',
    title: "Category 4"
    // subcategories:['cat4-1', 'cat4-2']
  },
  {
    id:'cat4-1',
    title: 'Category 4-1',
    parent: 'cat4'
    // subcategories:['cat4-1-1', 'cat4-1-2']
  },
  {
    id:'cat4-1-1',
    title: 'Category 4-1-1',
    parent: 'cat4-1'
  }, {
    id:'cat4-1-2',
    title: 'Category 4-1-2',
    parent: 'cat4-1'
  },
  {
    id:'cat4-2',
    title: 'Category 4-2',
    parent: 'cat4'
  },
  {
    id: 'cat5',
    title: "Category 5"
  }
];

var tasksList = [
  {
    id: 1,
    title: "Task 1"
  },
  {
    id: 2,
    title: "Task 2"
  },
  {
    id: 3,
    title: "Task 3"
  },
  {
    id: 4,
    title: "Task 4"
  },
  {
    id: 5,
    title: "Task 5"
  },
  {
    id: 6,
    title: "Task 6"
  },
  {
    id: 7,
    title: "Task 7"
  }
];

function loadCategoriesList(){
  return new Promise(function(resolve){
    resolve(categoriesList);
  });
}

function loadTasksList(){
  return new Promise(function(resolve){
    resolve(tasksList);
  });
}

export {loadCategoriesList, loadTasksList}

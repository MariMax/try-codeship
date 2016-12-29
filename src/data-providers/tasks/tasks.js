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
  },
  {
    id:'cat4-1',
    title: 'Category 4-1',
    parent: 'cat4'
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
    title: "Task 1",
    categoryId: 'cat1'
  },
  {
    id: 2,
    title: "Task 2",
    categoryId: 'cat2',
    done:true
  },
  {
    id: 3,
    title: "Task 3",
    categoryId: 'cat3'
  },
  {
    id: 4,
    title: "Task 4",
    categoryId: 'cat5'
  },
  {
    id: 5,
    title: "Task 5",
    categoryId: 'cat5',
    done:true
  },
  {
    id: 6,
    title: "Task 6",
    categoryId: 'cat4-1-1'
  },
  {
    id: 7,
    title: "Task 7",
    categoryId: 'cat4-2',
    done: true
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

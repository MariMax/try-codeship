cd build
git init
#git remote add origin git@github.com:Svyatoslavik/react-mentoring-task.git
git remote add origin https://github.com/Svyatoslavik/react-mentoring-task.git
git add .
git commit -m"deployment to gh-pages [skip ci]"
git checkout -b gh-pages
git push origin gh-pages -f
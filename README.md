# Приложение "lingua".

_Помощь в изучении слов английского языка._

---

Включает в себя:

1.  <ins>Страница "Главная"</ins>. <br>
    Карточки для навигации внутри приложения.<br>
2.  <ins>Страница "Рекомендованные слова"</ins>. <br>
    2.1 Слова загружаются с сервера. Реализована возможность добавлять слово в «Мои слова» для изучения.<br>
    2.2 Вызов карусели карточек для изучения слов. Просмотр перевода слова<br>
    2.3 Счетчик выученных слов (запускается при нажатии на кнопку «Знаю слово» в карточке).<br>
3.  <ins>Страница "Мои слова"</ins>. <br>
    3.1 Редактирование слов.<br>
    3.2 Вызов карусели карточек для изучения слов. Просмотр перевода слова и счетчик выученных слов.<br>
    3.3 Возможность добавлять слова в список изученных.<br>
4.  <ins>Страница "Изученные слова"</ins>. <br>
    4.1 Вызов карусели карточек для изучения слов. Просмотр перевода слова и счетчик выученных слов.<br>
    4.2 Удаление слова.<br>
5.  <ins>Страница "Добавить слово"</ins>. <br>
    Отправка нового слова на сервер.<br>

    Также добавлен Loader (ожидание загрузки с сервера) и страница 404.<br>

    ![GitHub language count](https://img.shields.io/github/languages/count/ZojaPonomarjova/lingua)
    ![GitHub top language](https://img.shields.io/github/languages/top/ZojaPonomarjova/lingua)
    ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ZojaPonomarjova/lingua)
    ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/ZojaPonomarjova/lingua)
    ![GitHub last commit](https://img.shields.io/github/last-commit/ZojaPonomarjova/lingua)
    ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/ZojaPonomarjova/lingua)

---

![gif](https://github.com/ZojaPonomarjova/lingua/blob/master/public/assets/images/review2.gif)

#### Используемые технологии:

- React
- React Hooks
- SASS
- API
- MobX

#### Запуск приложения:

```
npm install
npm start
```

Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

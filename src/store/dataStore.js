import { action, makeObservable, observable, runInAction } from "mobx";

export default class DataStore {
  data = [];
  errorText = "";
  errorTextForGetData = "";
  isWordsLoading = false;
  isLoaded = false;
  isDeleted = undefined;
  isWordChanged = undefined;
  myWordsArray = JSON.parse(localStorage.getItem("myWords")) || [];
  myWordsIdArr = JSON.parse(localStorage.getItem("myWordsId")) || [];
  knownWordsArray = JSON.parse(localStorage.getItem("knownWords")) || [];

  constructor() {
    makeObservable(this, {
      data: observable,
      errorText: observable,
      isLoaded: observable,
      errorTextForGetData: observable,
      isDeleted: observable,
      isWordChanged: observable,
      myWordsArray: observable,
      myWordsIdArr: observable,
      knownWordsArray: observable,
      getData: action,
      handleClickToAdd: action,
      handleClickToDelete: action,
      handleClickToSendChanges: action,
      addWordToMyWords: action,
      addWordToKnownWords: action,
    });
  }

  //загружаем слова с сервера
  getData = () => {
    //при загрузке страницы проверяем хранилище. Если там нет сохраненных слов, добавляем туда пустой массив
    if (localStorage.getItem("myWords") === null) {
      localStorage.setItem("myWords", "[]");
    }
    if (localStorage.getItem("myWordsId") === null) {
      localStorage.setItem("myWordsId", "[]");
    }
    if (localStorage.getItem("knownWords") === null) {
      localStorage.setItem("knownWords", "[]");
    }
    this.errorTextForGetData = "";
    this.isWordsLoading = true;
    if (this.isLoaded) {
      return;
    }
    fetch("http://itgirlschool.justmakeit.ru/api/words")
      .then(response => response.json())
      .then(words => {
        try {
          runInAction(() => {
            this.data = words;
          });

          this.isWordsLoading = false;
          this.isLoaded = true;

          if (words.length === 0) {
            throw new ReferenceError("Что-то пошло не так.");
          }
          if (words === undefined) {
            throw new ReferenceError(
              "Попробуйте повторить запрос: пришли некорректные данные.",
            );
          }
        } catch (error) {
          console.log(error);
          this.isWordsLoading = false;
          this.errorTextForGetData = error;
          this.isLoaded = false;
        }
      })
      .catch(error => {
        console.log(error);
        this.isWordsLoading = false;
        this.isLoaded = false;
        this.errorTextForGetData = "Проверьте свое соединение с сетью";
      });
  };

  //функция для добавления слов
  handleClickToAdd = value => {
    this.errorText = "";
    //только если нет пустых граф
    if (
      value.transcription !== "" ||
      value.english !== "" ||
      value.russian !== ""
    ) {
      try {
        fetch(`http://itgirlschool.justmakeit.ru/api/words/add`, {
          method: "POST",
          body: JSON.stringify(value),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
          .then(response => response.json())
          .then(word => {
            runInAction(() => {
              this.data.push(word);
            });
          })
          .catch(error => {
            console.log(error);

            this.errorText = "Проверьте ваше соединение с сетью.";
          });
      } catch (error) {
        console.log(error);
        this.errorText = "Что-то пошло не так.";
      }
    }
  };

  //функция для удаления слов
  handleClickToDelete = (wordId, word) => {
    this.isDeleted = undefined;
    try {
      fetch(`http://itgirlschool.justmakeit.ru/api/words/${wordId}/delete`, {
        method: "POST",
        body: JSON.stringify(word),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then(response => response.json())
        .then(response => {
          runInAction(() => {
            this.isDeleted = true;

            //если слово удаляется успешно, удалить его из хранилища
            const knownWordsArrUpdate = this.knownWordsArray.filter(item => {
              return item.id !== wordId;
            });
            this.knownWordsArray = knownWordsArrUpdate;
            localStorage.setItem(
              "knownWords",
              JSON.stringify(knownWordsArrUpdate),
            );
            //если запрос прошел, убираем слово в рекомендованных словах

            //поскольку в хранилище могут быть слова, которых уже нет на сервере, то удаляем из рекомендованных слов только тогда, когда ответ от сервера - true
            if (response === true) {
              const recommendedWordsArrUpdate = this.data.filter(item => {
                return item.id !== wordId;
              });
              this.data = recommendedWordsArrUpdate;
            }
          });
        })
        .catch(error => {
          //если запрос не прошел, выводим ошибку и не удаляем слово из массива
          this.isDeleted = false;

          console.log(error);
        });
    } catch (error) {
      // this.isDeleted = false;
      console.log(error);
    }
  };

  handleClickToSendChanges = (id, value) => {
    this.isWordChanged = undefined;
    fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update/`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(response => response.json())
      .then(word => {
        console.log(word);
        this.isWordChanged = true;
      })
      .catch(error => {
        console.log(error);
        this.isWordChanged = false;
      });
  };

  //добавляем мои слова в массив
  addWordToMyWords = word => {
    //если слова не было в массиве, добавляем его в массив
    if (!JSON.parse(localStorage.getItem("myWords")).includes(word)) {
      this.myWordsArray.push(word);
      this.myWordsIdArr.push(word.id);
      localStorage.setItem("myWords", JSON.stringify(this.myWordsArray));
      localStorage.setItem("myWordsId", JSON.stringify(this.myWordsIdArr));
    }
  };

  //добавляем слова в массив изученных слов
  addWordToKnownWords = word => {
    //если слова не было в массиве, добавляем его в массив
    if (!JSON.parse(localStorage.getItem("knownWords")).includes(word)) {
      this.knownWordsArray.push(word);
      //убираем из массива с моими словами выученные слова
      const myWordsArrUpdate = this.myWordsArray.filter(item => {
        return item.id !== word.id;
      });
      this.myWordsArray = myWordsArrUpdate;
      localStorage.setItem("knownWords", JSON.stringify(this.knownWordsArray));
      localStorage.setItem("myWords", JSON.stringify(this.myWordsArray));
    }
  };
}

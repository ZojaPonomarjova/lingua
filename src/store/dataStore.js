import { action, makeObservable, observable } from "mobx";

export default class DataStore {
  data = [];
  errorText = "";
  errorTextForGetData = "";

  isWordsLoading = false;
  isLoaded = false;
  isDeleted = undefined;
  isWordChanged = undefined;

  constructor() {
    makeObservable(this, {
      data: observable,
      errorText: observable,
      isLoaded: observable,
      errorTextForGetData: observable,
      isDeleted: observable,
      isWordChanged: observable,
      getData: action,
      handleClickToAdd: action,
      handleClickToDelete: action,
      handleClickToSendChanges: action,
    });
  }

  getData = () => {
    this.errorTextForGetData = "";
    this.isWordsLoading = true;
    if (this.isLoaded) {
      return;
    }
    fetch(" /api/words")
      .then(response => response.json())
      .then(words => {
        try {
          // console.log(words);
          this.data = words;
          this.isWordsLoading = false;
          this.isLoaded = true;
          // setTimeout(() => (this.isWordsLoading = false), 5000);
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
        fetch(`/api/words/add`, {
          method: "POST",
          body: JSON.stringify(value),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
          .then(response => response.json())
          .then(word => {
            // console.log(word);
            this.data.push(word);

            // value = {
            //   english: "",
            //   transcription: "",
            //   russian: "",
            //   tags: "",
            // };
          })
          .catch(error => {
            console.log(error);

            this.errorText = "Проверьте ваше соединение с сетью.";
            // console.log(this.errorText);
          });
      } catch (error) {
        console.log(error);
        this.errorText = "Что-то пошло не так.";
        // console.log(this.errorText);
      }
    }
  };

  //функция для удаления слов
  handleClickToDelete = (wordId, word) => {
    this.isDeleted = undefined;
    try {
      fetch(`/api/words/${wordId}/delete`, {
        method: "POST",
        body: JSON.stringify(word),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then(response => response.json())
        .then(response => {
          // console.log(response);
          //если слово удаляется успешно, передаем состояние, чтобы удалить его из хранилища
          this.isDeleted = true;
          //если запрос прошел, убираем слово в рекомендованных словах
          if (response === true) {
            const recommendedWordsArrUpdate = this.data.filter(item => {
              if (item.id !== wordId) {
                return item;
              }
            });
            this.data = recommendedWordsArrUpdate;
          }
        })
        .catch(error => {
          //если запрос не прошел, выводим ошибку и не удаляем слово из массива
          this.isDeleted = false;

          console.log(error);
        });
    } catch (error) {
      this.isDeleted = false;
      console.log(error);
    }
  };

  handleClickToSendChanges = (id, value) => {
    this.isWordChanged = undefined;
    fetch(`/api/words/${id}/update/`, {
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
        // console.log(this.isWordChanged);
      })
      .catch(error => {
        console.log(error);
        this.isWordChanged = false;
      });
  };
}

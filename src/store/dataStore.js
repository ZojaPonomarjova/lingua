import { makeAutoObservable } from "mobx";

export default class DataStore {
  data = [];
  errorText = "";
  isWordsLoading = false;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  getData = () => {
    this.errorText = "";
    this.isWordsLoading = true;
    if (this.isLoaded) {
      return;
    }
    fetch(" /api/words")
      .then(response => response.json())
      .then(words => {
        try {
          console.log(words);
          this.data = words;
          this.isWordsLoading = false;
          this.isLoaded = true;
          // setTimeout(() => setIsWordsLoading(false), 5000);
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
          this.errorText = error;
          this.isLoaded = false;
        }
      })
      .catch(error => {
        console.log(error);
        this.isWordsLoading = false;
        this.isLoaded = false;
        this.errorText = "Проверьте свое соединение с сетью";
      });
  };
}

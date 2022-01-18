import "./app.scss";
import "./assets/styles/common.scss";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import { Provider } from "mobx-react";
import store from "./store";

const App = () => {
  return (
    <div className="App">
      <Provider {...store}>
        <Header />
        <Main />
        <Footer />
      </Provider>
    </div>
  );
};

export default App;

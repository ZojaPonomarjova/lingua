import "./app.scss";
import "./components/assets/styles/common.scss";
import Header from "./components/header/header";
import Main from "./components/main";
import Footer from "./components/footer/footer";
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

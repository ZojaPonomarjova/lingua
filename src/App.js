import "./app.scss";
import "./components/assets/styles/common.scss";
import Header from "./components/header/header";
import Main from "./components/main";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;

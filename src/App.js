import "./app.scss";
import "./components/assets/styles/common.scss";
import Header from "./components/header/header";
import Main from "./components/main";
import Footer from "./components/footer/footer";
// import PageNotFound from "./components/pageNotFound/pageNotFound";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      {/* <PageNotFound /> */}
    </div>
  );
};

export default App;

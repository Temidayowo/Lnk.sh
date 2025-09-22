import Header from "./components/header";
import Footer from "./components/footer";
import Card from "./components/card";

function App() {
  return (
    <>
      <Header />
      <div className="w-full h-screen flex justify-center items-center absolute top-0">
        <Card />
      </div>
      <Footer />
    </>
  );
}

export default App;

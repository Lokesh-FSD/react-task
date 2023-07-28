import Card from "./components/card/Card";

function App() {
  return (
    <div className="h-screen bg-orange-400 pt-10 text-center">
      <main>
        <div className="mx-10 my-10 w-[80%] md:mx-auto md:my-20 md:w-[1000px]">
          <Card />
        </div>
      </main>
    </div>
  );
}

export default App;

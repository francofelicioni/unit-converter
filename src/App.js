import './App.css';
import Header from './components/header/header';
import Converter from './components/converter/converter';
import Footer from './components/footer/footer';
import Saved from './components/saved/saved';
import { useEffect, useState } from 'react';


function App() {

  const [saved, setSaved] = useState ([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('saved'))) {
      setSaved(JSON.parse(localStorage.getItem('saved')));
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="converter">
        <Converter 
          saved={saved}
          setSaved={setSaved}
        />
      </div>
      <div className="saved">
        {<Saved 
          saved={saved}
          setSaved={setSaved}
        />}
      </div>
      <Footer />
    </div>
  );
}

export default App;

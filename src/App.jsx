import React from "react";
import './App.css';
import Converter from "./kit/components/select-currency";

// 1lj8u9jlnsbxoHPh8hVOQokpoetuZZtI

function App() {
  return (
    <div className={'container'}>
        <h4 className={'text'}>Simple Currency Converter</h4>
        <div className={'border'}>
            <Converter />
        </div>

    </div>
  );
}

export default App;

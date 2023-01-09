import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./converter.css";

const Converter = ({ saved, setSaved }) => {
  const [convertType, setConvertType] = useState("kmmiles");
  const [inputValue, setInputValue] = useState("");
  const [initialUnit, setInitialUnit] = useState("km");
  const [result, setResult] = useState("0");
  const [finalUnit, setFinalUnit] = useState("miles");

  const calculo = (input) => {
    if (convertType === "kmmiles") {
      setResult((input * 0.621371).toFixed(2));
    } else if (convertType === "mileskm") {
      setResult((input * 1.60934).toFixed(2));
    } else if (convertType === "ftmt") {
      setResult((input * 0.3048).toFixed(2));
    } else if (convertType === "mtft") {
      setResult((input * 3.28084).toFixed(2));
    } else if (convertType === "cmin") {
      setResult((input * 0.393701).toFixed(2));
    } else if (convertType === "incm") {
      setResult((input * 2.54).toFixed(2));
    }
  };

  const handleSelect = (e) => {
    if (e.target.value === "kmmiles") {
      setInitialUnit("km");
      setFinalUnit("miles");
      setConvertType(e.target.value);
    } else if (e.target.value === "mileskm") {
      setInitialUnit("miles");
      setFinalUnit("km");
      setConvertType(e.target.value);
    } else if (e.target.value === "ftmt") {
      setInitialUnit("feet");
      setFinalUnit("metres");
      setConvertType(e.target.value);
    } else if (e.target.value === "mtft") {
      setInitialUnit("metres");
      setFinalUnit("feet");
      setConvertType(e.target.value);
    } else if (e.target.value === "cmin") {
      setInitialUnit("centimetres");
      setFinalUnit("inches");
      setConvertType(e.target.value);
    } else if (e.target.value === "incm") {
      setInitialUnit("inches");
      setFinalUnit("centimetres");
      setConvertType(e.target.value);
    }
  };

  const handleSwitch = () => {
    setInitialUnit(finalUnit);
    setFinalUnit(initialUnit);

    setInputValue(result);
    setResult(inputValue);

    setConvertType(
      convertType === "kmmiles"
        ? "mileskm"
        : convertType === "mileskm"
        ? "kmmiles"
        : convertType === "ftmt"
        ? "mtft"
        : convertType === "mtft"
        ? "ftmt"
        : convertType === "cmin"
        ? "incm"
        : "cmin"
    );

    let select = document.querySelector(".select");

    if (select.value === "kmmiles") {
      select.value = "mileskm";
    } else if (select.value === "mileskm") {
      select.value = "kmmiles";
    } else if (select.value === "ftmt") {
      select.value = "mtft";
    } else if (select.value === "mtft") {
      select.value = "ftmt";
    } else if (select.value === "cmin") {
      select.value = "incm";
    } else {
      select.value = "cmin";
    }
  };

  const handleInput = (e) => {
    calculo(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    const toSave = `${inputValue} ${initialUnit} → ${result} ${finalUnit}`;
    const newSave = [...saved, toSave];
    localStorage.setItem("saved", JSON.stringify(newSave));
    
      inputValue !== "" && inputValue !== 0
        ? setSaved(newSave)
        : Swal.fire({
            title: "Error!",
            text: "Input value can not be empty or zero.  ",
            icon: "error",
            confirmButtonText: "OK",
          });
  
  };

  useEffect(() => {
    calculo(inputValue);
  }, [convertType]);

  return (
    <div className="Converter">
      <h2 className="Converter-title">convert</h2>
      <div className="Input-container">
        <div className="Select-container">
          <div className="select-icon">
            <select
              className="select"
              defaultValue={"kmmiles"}
              onChange={handleSelect}
            >
              <option value="kmmiles">km → miles</option>
              <option value="mileskm">miles → km</option>
              <option value="ftmt">feet → metres</option>
              <option value="mtft">metres → feet</option>
              <option value="cmin">centimetres → inches</option>
              <option value="incm">inches → centimetres</option>
            </select>
            <img
              src="icons/switch-white.svg"
              alt="Switch-white"
              onClick={handleSwitch}
            />
          </div>
          <div className="input-box">
            <input
              className="input"
              type="number"
              value={inputValue}
              onChange={handleInput}
            />
            <span>{initialUnit}</span>
          </div>
        </div>
        <div className="Converter-footer">
          <img src="icons/heart.svg" alt="Heart" onClick={handleSave} />
          <div className="Converter-result">
            <h2>{result}</h2>
            <span>{finalUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;

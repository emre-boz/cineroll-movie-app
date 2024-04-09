import { useState, useRef, useEffect } from "react";
import "../styles/animated-toggle-btn.css";

function AnimatedToggleButton({
  onClick,
  optionAname,
  optionBname,
  displayItem,
}) {
  const [selectWindow, setSelectWindow] = useState(
    displayItem == true ? "optionA" : "optionB"
  );

  const optionARef = useRef(null);
  const optionBRef = useRef(null);
  const choosedRef = useRef(null);

  function toggleAnimation() {
    const optionA = optionARef.current;
    const optionB = optionBRef.current;
    const choosed = choosedRef.current;

    if (selectWindow == "optionA") {
      choosed.style.left = 0 + "px";
      choosed.style.width = optionA.getBoundingClientRect().width + "px";
      optionA.style.color = "#fffff8";
      optionB.style.color = "#96968a";
    } else if (selectWindow == "optionB") {
      choosed.style.left = optionA.getBoundingClientRect().width + "px";
      choosed.style.width = optionB.getBoundingClientRect().width + "px";
      optionB.style.color = "#fffff8";
      optionA.style.color = "#96968a";
    }
  }

  useEffect(() => {
    displayItem == true
      ? setSelectWindow("optionA")
      : setSelectWindow("optionB");
  }, [displayItem]);
  useEffect(() => {
    toggleAnimation();
  }, []);
  useEffect(() => {
    toggleAnimation();
  }, [selectWindow]);

  function handleClick() {
    displayItem == true
      ? setSelectWindow("optionA")
      : setSelectWindow("optionB");
    onClick && onClick();
  }

  return (
    <div className="toggle-select-window" onClick={handleClick}>
      <div className="optionA" ref={optionARef}>
        {optionAname}
      </div>
      <div className="optionB" ref={optionBRef}>
        {optionBname}
      </div>
      <div className="choosed" ref={choosedRef}></div>
    </div>
  );
}

export default AnimatedToggleButton;

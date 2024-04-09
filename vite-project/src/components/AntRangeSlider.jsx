import { useState } from "react";
import { Slider, ConfigProvider } from "antd";
import "../styles/ant-range-slider.css";
function AntRangeSlider({ title, formElementsCombiner, min, max, step }) {
  const [value, setValue] = useState([min, max]);

  function handleRating(newValue) {
    setValue(newValue);
    if (title == "Rating") {
      formElementsCombiner(false, "vote_average.gte", newValue[0]);
      formElementsCombiner(false, "vote_average.lte", newValue[1]);
    } else if (title == "Runtime") {
      formElementsCombiner(false, "with_runtime.gte", newValue[0]);
      formElementsCombiner(false, "with_runtime.lte", newValue[1]);
    }
  }

  return (
    <div className="filter-form-section">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#021927",
          },
        }}
      >
        <div className="ant-range-slider">
          <h4 className="filter-section-title">{title}</h4>
          <Slider
            range={{ draggableTrack: true }}
            min={min}
            max={max}
            defaultValue={[min, max]}
            onChange={handleRating}
            value={value}
            step={step}
            allowCross={false}
          />
          <div>
            <span>Min  {value[0]}</span>
            {" | "}
            <span>Max  {value[1]}</span>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default AntRangeSlider;

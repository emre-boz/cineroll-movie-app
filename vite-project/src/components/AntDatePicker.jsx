import { ConfigProvider, DatePicker } from "antd";
import "../styles/ant-date-picker.css";

function AntDatePicker({ title, formElementsCombiner }) {

  function handleFromDate(date,dateString) {
    formElementsCombiner(false, "primary_release_date.gte", dateString);
  }
  function handleToDate(date,dateString) {
    formElementsCombiner(false, "primary_release_date.lte", dateString);
  }

  return (
    <>
      <div className="filter-section">
        <h4 className="filter-section-title">{title}</h4>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#021927",
            },
          }}
        >
          <div className="ant-date-pickers">
        
            <div className="ant-date-pickers-item">
              <span className="ant-date-pickers-item-text">From: </span>
              <DatePicker
                name="primary_release_date.gte"
                className="ant-date-picker"
                onChange={handleFromDate}
                picker="date"
              />
            </div>
            <div className="ant-date-pickers-item">
              <span className="ant-date-pickers-item-text">To:</span>
              <DatePicker
              name="primary_release_date.lte"
                className="ant-date-picker"
                onChange={handleToDate}
                picker="date"
              />
            </div>
          </div>
        </ConfigProvider>
      </div>
    </>
  );
}

export default AntDatePicker;

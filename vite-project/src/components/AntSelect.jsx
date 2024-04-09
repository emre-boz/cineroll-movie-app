import { ConfigProvider, Select } from "antd";

function AntSelect({ title, formElementsCombiner,options,selectName }) {

  function handleSelect(value) {
    formElementsCombiner(false, selectName, value);
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
        <Select
          defaultValue="Select.."
          style={{
            width: 200,
          }}
          onChange={handleSelect}
          options={options.map((option) => ({
            value: option.code,
            label: option.name,
          }))}
        />

      </ConfigProvider>
      </div>
    </>
  );
}

export default AntSelect;

import { useState, useEffect } from "react";
export default function EditForm() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);
  const [selectedValues, setSelectedValues] = useState({});
  const API_URL = import.meta.env.VITE.API_URL;
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted with values:", selectedValues);
  }

  function handleSelectChange(e, itemId) {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [itemId]: e.target.value,
    }));
  }
  useEffect(() => {
    async function loadData() {
      const data = await fetchData(`${API_URL}/${route}`, "GET");

      if (Array.isArray(data)) {
        setFetchSelectData(data);
      } else {
        console.error("Unexpected data format", data);
        setFetchSelectData([]);
      }
    }

    loadData();
    if (dataArray.length === 0) {
      setDataArray([]);
    }
  }, []);
  return (
    <div>
      <button onClick={() => setShowForm(true)}>Edit</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          {data.map((item) => (
            <div key={item.id}>
              <label htmlFor={`diet-type-${item.id}`}>{item.name}</label>
              <select
                id={`diet-type-${item.id}`}
                name={`Diet-Type-${item.id}`}
                value={selectedValues[item.id] || ""}
                onChange={(e) => handleSelectChange(e, item.id)}
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

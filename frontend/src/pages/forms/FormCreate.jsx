import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createForm } from "../../api/api";

const FormCreate = () => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const addField = () => {
    setFields([
      ...fields,
      { label: "", field_type: "text" },
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      name : name,
      fields : fields
    }
    await createForm(payload)
    navigate("/forms");
  };

  return (
    <div>
      <h2>Create Form</h2>

      <input
        placeholder="Form Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h3>Fields</h3>

      {fields.map((field, index) => (
        <div key={index}>
          <input
            placeholder="Label"
            value={field.label}
            onChange={(e) =>
              updateField(index, "label", e.target.value)
            }
          />

          <select
            value={field.type}
            onChange={(e) =>
              updateField(index, "field_type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="password">Password</option>
          </select>
        </div>
      ))}

      <button onClick={addField}>Add Field</button>
      <br />
      <button onClick={handleSubmit}>Save Form</button>
    </div>
  );
};

export default FormCreate;

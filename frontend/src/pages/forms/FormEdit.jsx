import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editFormById, getFormById } from "../../api/api";

const FormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    const res = await getFormById(id);
    setName(res.data.name);
    setFields(res.data.fields);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addField = () => {
    setFields([
      ...fields,
      { label: "", field_type: "text" },
    ]);
  };

  const removeField = (index) => {
    setFields((prevFields) =>
      prevFields.filter((_, i) => i !== index)
    );
  };

  const saveChanges = async () => {
    await editFormById(id, name, fields)
    navigate("/forms");
  };
  console.log(fields);
  
  return (
    <div>
      <h2>Edit Form</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {fields.map((field, index) => (
        <div key={field.id || index}>
          <input
            value={field.label}
            onChange={(e) =>
              updateField(index, "label", e.target.value)
            }
          />

          <select
            value={field.field_type}
            onChange={(e) =>
              updateField(index, "field_type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="password">Password</option>
          </select>
          
          <button onClick={()=>removeField(index)}>Remove</button>
        </div>
      ))}

      <button onClick={addField}>Add Field</button>
      <button onClick={saveChanges}>Update</button>
    </div>
  );
};

export default FormEdit;

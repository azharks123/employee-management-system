import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { editFormById, getFormById } from "../../api/api";
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';

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
    setFields(res.data.fields || []);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addField = () => {
    setFields([...fields, { label: "", field_type: "text" }]);
  };

  const removeField = (index) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setFields(items);
  };

  const saveChanges = async () => {
    await editFormById(id, name, fields);
    navigate("/forms");
  };

  return (
    <div>
      <h2>Edit Form</h2>

      <input
        placeholder="Form Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((field, index) => (
                <Draggable
                  key={field.id ? `field-${field.id}` : `field-${index}`}
                  draggableId={
                    field.id ? `field-${field.id}` : `field-${index}`
                  }
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: 10,
                        marginBottom: 8,
                        border: "1px solid #ccc",
                        background: "#fafafa",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <input
                        placeholder="Label"
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

                      <DeleteIcon onClick={() => removeField(index)}/>
                      <DragHandleIcon />

                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={addField}>Add Field</button>
      <br />
      <button onClick={saveChanges}>Save</button>
    </div>
  );
};

export default FormEdit;

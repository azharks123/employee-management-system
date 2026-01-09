import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { createForm } from "../../api/api";

const FormCreate = () => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const addField = () => {
    setFields([...fields, { label: "", field_type: "text" }]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setFields(items);
  };

  const handleSubmit = async () => {
    await createForm({ name, fields });
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((field, index) => (
                <Draggable
                  key={index}
                  draggableId={`field-${index}`}
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
      <button onClick={handleSubmit}>Save Form</button>
    </div>
  );
};

export default FormCreate;

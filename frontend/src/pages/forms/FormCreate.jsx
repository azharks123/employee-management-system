import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { createForm } from "../../api/api";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Switch,
} from "@mui/material";

const FormCreate = () => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const addField = () => {
    setFields([...fields, { label: "", field_type: "text", is_required: false }]);
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
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Form
        </Typography>

        {/* Form Name */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Form Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Paper>

        {/* Draggable Fields */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {fields.map((field, index) => (
                  <Draggable
                    key={index}
                    draggableId={`field-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          p: 2,
                          mb: 2,
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                        }}
                        style={provided.draggableProps.style}
                      >
                        <TextField
                          label="Label"
                          value={field.label}
                          onChange={(e) =>
                            updateField(index, "label", e.target.value)
                          }
                          sx={{ flex: 1 }}
                        />

                        <TextField
                          select
                          label="Field Type"
                          value={field.field_type}
                          onChange={(e) =>
                            updateField(index, "field_type", e.target.value)
                          }
                          sx={{ width: 160 }}
                        >
                          <MenuItem value="text">Text</MenuItem>
                          <MenuItem value="number">Number</MenuItem>
                          <MenuItem value="date">Date</MenuItem>
                          <MenuItem value="password">Password</MenuItem>
                        </TextField>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2">Required</Typography>
                          <Switch
                            checked={field.is_required}
                            onChange={(e) =>
                              updateField(index, "is_required", e.target.checked)
                            }
                          />
                        </Box>

                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        {/* Actions */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="outlined" onClick={addField}>
            Add Field
          </Button>

          <Button disabled={fields.length == 0} variant="contained" onClick={handleSubmit}>
            Save Form
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormCreate;

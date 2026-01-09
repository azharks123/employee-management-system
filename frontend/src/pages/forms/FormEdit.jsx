import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { editFormById, getFormById } from "../../api/api";
import DeleteIcon from "@mui/icons-material/Delete";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

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
    setFields([...fields, { label: "", field_type: "text", is_required: false }]);
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
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Form
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
                    key={field.id ? `field-${field.id}` : `field-${index}`}
                    draggableId={
                      field.id ? `field-${field.id}` : `field-${index}`
                    }
                    index={index}
                  >
                    {(provided) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          p: 2,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                        style={provided.draggableProps.style}
                      >
                        {/* Drag Handle */}
                        <Box {...provided.dragHandleProps}>
                          <DragHandleIcon color="action" />
                        </Box>

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

                        <IconButton
                          color="error"
                          onClick={() => removeField(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
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

          <Button variant="contained" onClick={saveChanges}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormEdit;

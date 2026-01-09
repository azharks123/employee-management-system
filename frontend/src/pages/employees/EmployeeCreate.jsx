import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getFormById, getForms, createEmployee } from "../../api/api";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const EmployeeCreate = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});

  const [searchParams] = useSearchParams();

  useEffect(() => {
    loadForms();
  }, []);

  useEffect(() => {
    const formIdFromQuery = searchParams.get("form");
    if (formIdFromQuery) {
      setSelectedForm(formIdFromQuery);
      loadFormFields(formIdFromQuery);
    }
  }, [searchParams]);

  const loadForms = async () => {
    const res = await getForms();
    setForms(res.data);
  };

  const loadFormFields = async (formId) => {
    const res = await getFormById(formId);
    setFields(res.data.fields);
  };

  const handleFormChange = (e) => {
    const formId = e.target.value;
    setSelectedForm(formId);
    loadFormFields(formId);
    setValues({});
  };

  const handleChange = (fieldId, value) => {
    setValues({ ...values, [fieldId]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      form_id: selectedForm,
      data: Object.entries(values).map(([field_id, value]) => ({
        field_id: Number(field_id),
        value,
      })),
    };

    await createEmployee(payload).then((res) => {
      if (res.status === 201) {
        alert("Employee created successfully");
      } else {
        alert("Connection problem");
      }
    });

    setValues({});
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Employee
        </Typography>

        {/* Form Selector */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            select
            fullWidth
            label="Select Form"
            value={selectedForm}
            onChange={handleFormChange}
          >
            {forms.map((form) => (
              <MenuItem key={form.id} value={form.id}>
                {form.name}
              </MenuItem>
            ))}
          </TextField>
        </Paper>

        {/* Dynamic Fields */}
        {fields.map((field) => (
          <Paper key={field.id} sx={{ p: 2, mb: 2 }}>
            <TextField
              fullWidth
              label={field.label}
              type={field.field_type}
              value={values[field.id] || ""}
              onChange={(e) =>
                handleChange(field.id, e.target.value)
              }
            />
          </Paper>
        ))}

        {/* Actions */}
        {fields.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" onClick={handleSubmit}>
              Save Employee
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EmployeeCreate;

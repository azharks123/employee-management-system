import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFormById, getForms } from "../../api/api";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    const res = await getForms();
    setForms(res.data);
  };

  const handleDelete = async (id) => {
      if (window.confirm("Delete this form?")) {
          await deleteFormById(id);
          fetchForms();
      }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Forms
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Form Name</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id} hover>
                  <TableCell>{form.id}</TableCell>
                  <TableCell>{form.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => navigate(`/forms/${form.id}/edit`)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      // disabled
                      onClick={()=>handleDelete(form.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {forms.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No forms found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default FormList;

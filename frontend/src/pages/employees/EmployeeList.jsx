import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/api";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async (params = {}) => {
    const res = await getEmployees(params);
    setEmployees(res.data);
  };

  const handleSearch = () => {
    if (label || value) {
      loadEmployees({ label, value });
    } else {
      loadEmployees();
    }
  };

  const handleClear = () => {
    loadEmployees();
    setLabel("");
    setValue("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this employee?")) {
      await deleteEmployee(id);
      loadEmployees();
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Employee List
        </Typography>

        {/* Search Section */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Field Label"
              size="small"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />

            <TextField
              label="Value"
              size="small"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>

            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Box>
        </Paper>

        {/* Employee Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Employee ID</strong></TableCell>
                <TableCell><strong>Form ID</strong></TableCell>
                <TableCell><strong>Details</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id} hover>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.form}</TableCell>

                  <TableCell>
                    {Object.entries(emp.data).map(([label, value]) => (
                      <Typography key={label} variant="body2">
                        <strong>{label}:</strong> {value}
                      </Typography>
                    ))}
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {employees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No employees found
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

export default EmployeeList;

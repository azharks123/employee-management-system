import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/api";

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
        setLabel('')
        setValue('')
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this employee?")) {
            await deleteEmployee(id);
            loadEmployees();
        }
    };

    return (
        <div>
            <h2>Employee List</h2>

            {/* Search Section */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    placeholder="Field Label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />

                <input
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <button onClick={handleSearch}>Search</button>
                <button onClick={handleClear}>Clear</button>
            </div>

            {/* Employee Records */}
            {employees.length === 0 && <p>No employees found</p>}

            {employees.map((emp) => (
                <div
                    key={emp.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <strong>Employee ID:</strong> {emp.id}
                    <br />
                    <strong>Form ID:</strong> {emp.form}
                    <br />

                    <ul>
                        {Object.entries(emp.data).map(([label, value]) => (
                            <li key={label}>
                                <strong>{label}:</strong> {value}
                            </li>
                        ))}
                    </ul>

                    <button onClick={() => handleDelete(emp.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EmployeeList;

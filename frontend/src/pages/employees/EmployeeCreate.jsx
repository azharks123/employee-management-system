import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getFormById, getForms, createEmployee } from "../../api/api";

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

        await createEmployee(payload)
            .then((res) => {
                if (res.status === 201) {
                    alert("Employee created successfully")
                }
                else { alert("Connection problem") }
            });
        setValues({})
    };    

    return (
        <div>
            <h2>Create Employee</h2>

            <select value={selectedForm} onChange={handleFormChange}>
                {forms.map((form) => (
                    <option key={form.id} value={form.id}>
                        {form.name}
                    </option>
                ))}
            </select>

            <br /><br />

            {fields.map((field) => (
                <div key={field.id}>
                    <label>{field.label}</label>
                    <br />
                    <input
                        value={values[field.id] || ''}
                        type={field.field_type}
                        onChange={(e) =>
                            handleChange(field.id, e.target.value)
                        }
                    />
                </div>
            ))}

            {fields.length > 0 && (
                <>
                    <br />
                    <button onClick={handleSubmit}>
                        Save Employee
                    </button>
                </>
            )}
        </div>
    );
};

export default EmployeeCreate;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getForms} from "../../api/api";

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

  return (
    <div>
      <h2>Forms</h2>

      {/* <button onClick={() => navigate("/forms/create")}>
        Create New Form
      </button> */}

      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <strong>{form.name}</strong>
            <button onClick={() => navigate(`/forms/${form.id}/edit`)}>
              Edit
            </button>
            {/* <button
              onClick={() =>
                navigate(`/employees/create?form=${form.id}`)
              }
            >
              Create Employee
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;

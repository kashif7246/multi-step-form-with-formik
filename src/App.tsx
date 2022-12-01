import "./App.css";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import InputFields from "./InputFields";
import * as Yup from "yup";
import MultiStepForm, { FormStep } from "./MultiStepsForm";
const validationSchemas = Yup.object({
  firstName: Yup.string().required("Name is required"),
  lastName: Yup.string()
    .required("Please enter last name")
    .min(4, "Must be greater than 3"),
});

function App() {
  return (
    <div className="App">
      <MultiStepForm
        initialValues={{
          firstName: "",
          lastName: "",

          street: "",
          country: "",
        }}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchemas}
      >
        <FormStep
          stepName="person"
          onSubmit={() => console.log("step 1 submit")}
          validationSchema={validationSchemas}
        >
          <InputFields name="firstName" label="first name" />
          <InputFields name="lastName" label="last name" />
        </FormStep>
        <FormStep
          stepName="address"
          onSubmit={() => console.log("Step 2 submit")}
          validationSchema={Yup.object({
            street: Yup.string().required("Street is required"),
            country: Yup.string().required("Country is required"),
          })}
        >
          <InputFields name="street" label="Street" />
          <InputFields name="country" label="Country" />
        </FormStep>
      </MultiStepForm>
    </div>
  );
}

export default App;

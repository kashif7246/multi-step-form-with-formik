
import { useField } from "formik";
import { TextField } from "@mui/material";



function InputFields({ name, ...otherProps }: any) {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: "true",
  };
  if(meta && meta.touched && meta.error){
    configTextField.error=true
    configTextField.helperText=meta.error
  }

  return <TextField {...configTextField} />;
}

export default InputFields;

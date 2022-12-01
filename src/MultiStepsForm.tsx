import { Stepper, Step, StepLabel } from "@mui/material";
import {
  FormikConfig,
  FormikValues,
  Formik,
  Form,
  FormikHandlers,
  FormikHelpers,
} from "formik";
import React, { useState } from "react";
import FormNavigation from "./FormNavigation";
interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0);

  console.log(initialValues, "intial values");

  const [snapshot, setSnapShot] = useState(initialValues);

  const steps = React.Children.toArray(children) as React.ReactElement[];
  const step = steps[stepNumber];

  const isLastStep = stepNumber === steps.length - 1;

  console.log(stepNumber, "step Number", "Steps:", steps.length);

  const next = (values: FormikValues) => {
    setStepNumber(stepNumber + 1);
    setSnapShot(values);
  };
  const previous = (values: FormikValues) => {
    setSnapShot(values);
    setStepNumber(stepNumber - 1);
  };
  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };
  return (
    <div>
      <Formik
        validationSchema={step.props.validationSchema}
        initialValues={snapshot}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            <Stepper activeStep={stepNumber}>
              {steps.map(currentStep => {
                const label = currentStep.props.stepName;
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {step}

            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default MultiStepForm;

export const FormStep = ({ stepName = "", children }: any) => children;

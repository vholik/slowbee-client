interface StepProps {
  activeStep: number;
  children: any;
}

const Step = ({ activeStep, children }: StepProps) => {
  const activeSteps = ["General info", "Cover art", "Mp3 file upload"];

  return (
    <div>
      <h1 className="title">
        Step {activeStep + 1}: {activeSteps[activeStep]}
      </h1>
      {children}
    </div>
  );
};

export default Step;

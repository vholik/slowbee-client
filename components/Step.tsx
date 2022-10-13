import styled from "styled-components";

interface StepProps {
  activeStep: number;
  children: any;
  setActiveStep: any;
}

const Step = ({ activeStep, children, setActiveStep }: StepProps) => {
  const activeSteps = ["General info", "Cover art", "Mp3 file upload"];

  return (
    <StyledStep>
      <h1 className="title">
        Step {activeStep + 1}: {activeSteps[activeStep]}
      </h1>
      <div className="steps-circles">
        <div
          className={activeStep === 0 ? "circle active-circle" : "circle"}
          onClick={() => {
            setActiveStep(0);
          }}
        >
          <h1 className="step-number">1</h1>
        </div>
        <div className="circles-between-line"></div>
        <div
          className={activeStep === 1 ? "circle active-circle" : "circle"}
          onClick={() => {
            setActiveStep(1);
          }}
        >
          <h1 className="step-number">2</h1>
        </div>
        <div className="circles-between-line"></div>
        <div
          className={activeStep === 2 ? "circle active-circle" : "circle"}
          onClick={() => {
            setActiveStep(2);
          }}
        >
          <h1 className="step-number">3</h1>
        </div>
      </div>
      {children}
    </StyledStep>
  );
};

const StyledStep = styled.div`
  .steps-circles {
    margin-top: 45px;
    display: flex;
    align-items: center;
    .circles-between-line {
      background: var(--grey-30);
      height: 1px;
      width: 50px;
    }
    .circle {
      cursor: pointer;
      color: var(--grey-30);
      height: 100px;
      width: 100px;
      border: 1px dashed var(--grey-30);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .step-number {
        font-size: 28px;
        font-weight: 500;
      }
    }
  }
  .active-circle {
    border: 1px solid white !important;
    color: white !important;
  }
`;

export default Step;

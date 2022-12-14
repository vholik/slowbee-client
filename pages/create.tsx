import { ChangeEvent, useEffect, useRef, useState } from "react";
import Step from "../components/Step";
import { IUploadFormData } from "../types/uploadFormData";
import { firebaseHandler } from "../firebase";
import { uploadTrack } from "../store/reducers/track/UploadSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import styled from "styled-components";
import arrowRight from "../public/images/upload/dark-arrow-right.svg";
import Image from "next/image";
import Router from "next/router";
import AuthFirst from "../components/AuthFirst";
import { stateHandler } from "../store/reducers/state/StatusSlice";

const Create = () => {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.refreshReducer);
  const [isError, setIsError] = useState<any>("");
  const [isPercentageShow, SetIsPercentageShow] = useState(false);
  const audioRef = useRef(null);
  const coverRef = useRef<null | HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState({
    cover: "",
    audio: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [formData, setFormData] = useState<IUploadFormData>({
    name: "",
    artist: "",
    audio: "",
    cover: "",
    length: 0,
  });
  const [isOpen, setIsOpen] = useState(true);

  const uploadHandler = () => {
    setIsError("");
    try {
      if (!formData.audio && !formData.cover) {
        throw new Error("Please fill each gaps");
      }
      if (formData.name.length < 4) {
        throw new Error("Please fill name of the track");
      }
      if (formData.artist.length < 4) {
        throw new Error("Please fill artist name of the track");
      }
      if (formData.name.length > 35 || formData.artist.length > 35) {
        throw new Error(
          "The length of the name field can not be bigger that 35 symbols"
        );
      }
      if (formData.artist.length > 35 || formData.artist.length > 35) {
        throw new Error(
          "The length of the artist field can not be bigger that 35 symbols"
        );
      }
      const audioFormat =
        fileNames.audio.split(".")[fileNames.audio.split(".").length - 1];
      const coverFormat =
        fileNames.cover.split(".")[fileNames.audio.split(".").length - 1];
      if (audioFormat !== "mp3") {
        throw new Error("Format of the audio should be mp3");
      }
      if (
        coverFormat !== "jpg" &&
        coverFormat !== "png" &&
        coverFormat !== "jpeg"
      ) {
        throw new Error("Format of the image should be jpeg, png or jpg");
      }

      dispatch(uploadTrack(formData))
        .unwrap()
        .then((track) => {
          stateHandler({ message: "Song succesfuly has created" }, dispatch);
          setIsError("");
          return track;
        })
        .then((track) => {
          Router.push("/");
          console.log(track);
        })
        .catch((err) =>
          stateHandler({ message: err, isError: true }, dispatch)
        );
    } catch (error: any) {
      stateHandler({ message: error.message, isError: true }, dispatch);
    }
  };

  // Step handler
  const nextStep = () => {
    if (activeStep > 1) {
      return activeStep;
    }
    setActiveStep((prev) => prev + 1);
    setPercent(0);
    SetIsPercentageShow(false);
    setIsError("");
  };

  useEffect(() => {
    SetIsPercentageShow(false);
  }, [activeStep]);

  const uploadErrorHandler = (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
    setPercent: any,
    setFormData: any,
    SetIsPercentageShow: any,
    formData: IUploadFormData
  ) => {
    setIsOpen(true);

    try {
      firebaseHandler(
        e,
        type,
        setPercent,
        setFormData,
        SetIsPercentageShow,
        formData,
        setIsOpen
      );

      if ((e.target.files as any)[0].name) {
        if (type === "cover") {
          setFileNames({
            ...fileNames,
            cover: (e.target.files as any)[0].name,
          });
        }
        if (type === "audio") {
          setFileNames({
            ...fileNames,
            audio: (e.target.files as any)[0].name,
          });
        }
      }
    } catch (error: any) {
      stateHandler({ message: error.message, isError: true }, dispatch);
    }
  };

  if (!isLogged) {
    return <AuthFirst />;
  }

  return (
    <StyledCreate>
      <div className="container">
        <p className="subtitle">Upload a song</p>
        <Step
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isOpen={isOpen}
        >
          <div className={activeStep === 0 ? "wrapper" : "wrapper none"}>
            <label htmlFor="name" className="label">
              Name*
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
              placeholder="Name of track"
            />
            <label htmlFor="artist" className="label">
              Artist name*
            </label>
            <input
              type="text"
              name="artist"
              placeholder="Artist name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  artist: e.target.value,
                })
              }
            />
          </div>

          <div className={activeStep === 1 ? "wrapper" : "wrapper none"}>
            <label htmlFor="cover" className="label">
              Cover art*
            </label>
            <div className="file-input-wrapper">
              {fileNames.cover ? (
                <p className="file-name">{fileNames.cover}</p>
              ) : (
                <p className="file-name">Please upload your image</p>
              )}
              <input
                ref={coverRef}
                type="file"
                name="cover"
                accept="image/*"
                onChange={(e) =>
                  uploadErrorHandler(
                    e,
                    "cover",
                    setPercent,
                    setFormData,
                    SetIsPercentageShow,
                    formData
                  )
                }
              />
            </div>
            {isPercentageShow && <p className="percentage">{percent}% done</p>}
          </div>

          <div className={activeStep === 2 ? "wrapper" : "wrapper none"}>
            <label htmlFor="cover" className="label">
              Audio file*
            </label>
            <div className="file-input-wrapper">
              {fileNames.audio ? (
                <p className="file-name">{fileNames.audio}</p>
              ) : (
                <p className="file-name">Please upload your audio</p>
              )}
              <input
                ref={audioRef}
                type="file"
                name="audio"
                accept=".mp3"
                onChange={(e) =>
                  uploadErrorHandler(
                    e,
                    "audio",
                    setPercent,
                    setFormData,
                    SetIsPercentageShow,
                    formData
                  )
                }
              />
            </div>
            {isPercentageShow && <p className="percentage">{percent}% done</p>}
          </div>

          {activeStep === 2 ? (
            <button onClick={uploadHandler} className="btn" disabled={!isOpen}>
              Upload
            </button>
          ) : (
            <button className="btn" onClick={nextStep}>
              Next
              <Image src={arrowRight} alt="Next" />
            </button>
          )}
          {isError && <p className="error">{isError.message}</p>}
        </Step>
      </div>
    </StyledCreate>
  );
};

const StyledCreate = styled.div`
  .error {
    font-size: 18px;
    color: #fe2a2a;
    margin-top: 15px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 35px;
  }
  .label {
    font-size: 18px;
  }
  input {
    margin-top: 15px;
    margin-bottom: 35px;
    font-family: var(--font);
    font-size: 18px;
    padding: 20px 18px;
    outline: none;
    border: none;
    outline: none;
    background-color: transparent;
    color: white;
    border: 1px solid var(--grey-30);
    &::placeholder {
      color: var(--grey-30);
    }
  }
  .btn {
    background-color: white;
    color: var(--dark);
    &:hover {
      background-color: #b0b0b0;
    }
  }
  .percentage {
    margin-bottom: 15px;
  }
  .file-input-wrapper {
    margin-top: 15px;
    border: 1px solid var(--grey-30);
    position: relative;
    width: fit-content;
    margin-bottom: 35px;
    .file-name {
      top: calc(50% - 12px);
      left: 18px;
      position: absolute;
      font-size: 18px;
      color: var(--grey-30);
      display: flex;
      /* flex-direction: column; */
      justify-content: center;
    }

    input {
      width: 500px;
      height: 63px;
      margin: 0;
      padding: 0;
      opacity: 0;
    }
  }
  .none {
    display: none;
  }
`;

export default Create;

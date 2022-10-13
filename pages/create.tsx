import { ChangeEvent, useRef, useState } from "react";
import Step from "../components/Step";
import { IUploadFormData } from "../types/uploadFormData";
import storage from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadTrack } from "../store/reducers/UploadSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import styled from "styled-components";
import arrowRight from "../public/images/upload/dark-arrow-right.svg";
import Image from "next/image";

const Create = () => {
  const dispatch = useAppDispatch();
  const { track, error, isLoading } = useAppSelector(
    (state) => state.uploadReducer
  );
  const audioRef = useRef(null);
  const coverRef = useRef<null | HTMLInputElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [formData, setFormData] = useState<IUploadFormData>({
    name: "",
    artist: "",
    audio: "",
    cover: "",
    length: 0,
  });

  const uploadHandler = () => {
    dispatch(uploadTrack(formData))
      .unwrap()
      .then((track) => {
        console.log("Song created succesfully");
        return track;
      })
      .then((track) => {
        console.log(track);
      })
      .catch((err) => console.log(err));
  };

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as any;

    if (!files[0]) {
      alert("Please upload the image");
    }

    const storageRef = ref(
      storage,
      `/images/${Math.random() * 10 + files[0].name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setFormData({
            ...formData,
            cover: url,
          });
        });
      }
    );
  };

  const handleAudioInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as any;

    if (!files[0]) {
      alert("Please upload the audio");
    }
    const storageRef = ref(
      storage,
      `/audio/${Math.random() * 10 + files[0].name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          var au = document.createElement("audio");
          au.src = url;
          au.addEventListener(
            "loadedmetadata",
            () => {
              const duration = au.duration;
              setFormData({
                ...formData,
                audio: url,
                length: duration,
              });
            },
            false
          );
        });
      }
    );
  };

  // Step handler
  const nextStep = () => {
    if (activeStep > 1) {
      return activeStep;
    }
    setActiveStep((prev) => prev + 1);
    setPercent(0);
  };

  return (
    <StyledCreate>
      <p className="subtitle">Upload a song</p>
      <Step activeStep={activeStep}>
        {activeStep === 0 && (
          <div className="wrapper">
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
        )}
        {(coverRef.current as any)?.files[0].name && (
          <p>{(coverRef.current as any)?.files[0].name}</p>
        )}
        {activeStep === 1 && (
          <div className="wrapper">
            <label htmlFor="cover" className="label">
              Cover art*
            </label>
            <input
              ref={coverRef}
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleImageInput}
            />
            <p>{percent}% done</p>
          </div>
        )}
        {activeStep === 2 && (
          <div className="wrapper">
            <div className="file-input-wrapper">
              <input
                type="file"
                name="audio"
                accept=".mp3"
                onChange={handleAudioInput}
              />
            </div>
            <p>{percent}% done</p>
          </div>
        )}
        {activeStep === 2 ? (
          <button onClick={uploadHandler} className="btn">
            Upload
          </button>
        ) : (
          <button className="btn" onClick={nextStep}>
            Next
            <Image src={arrowRight} alt="Next" />
          </button>
        )}
      </Step>
    </StyledCreate>
  );
};

const StyledCreate = styled.div`
  padding-top: 50px;
  margin-left: 280px;
  padding-left: 100px;
  max-width: 1000px;

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
  .file-input-wrapper {
    input {
    }
  }
`;

export default Create;

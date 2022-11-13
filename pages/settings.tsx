import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import AuthFirst from "../components/AuthFirst";
import { firebaseHandler } from "../firebase";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import Image from "next/image";
import { uploadUserPhoto } from "../store/reducers/auth/UploadUserPhotoSlice";
import { stateHandler } from "../store/reducers/state/StatusSlice";

export default function Settings() {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.refreshReducer);
  const [percent, setPercent] = useState(0);
  const [isPercentageShow, SetIsPercentageShow] = useState(false);
  const [formData, setFormData] = useState({ cover: "" });
  const [isOpen, setIsOpen] = useState(true);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      firebaseHandler(
        e,
        "cover",
        setPercent,
        setFormData,
        SetIsPercentageShow,
        formData,
        setIsOpen
      );
    } catch (error: any) {
      stateHandler({ message: error.message, isError: true }, dispatch);
    }
  };

  const saveHandler = () => {
    try {
      if (!formData.cover) {
        throw new Error("Please make some changes");
      }
      if (!isOpen) {
        throw new Error("Please wait until file upload");
      }

      dispatch(uploadUserPhoto(formData.cover))
        .unwrap()
        .then((res) => {
          stateHandler({ message: "Succesfully changed settings" }, dispatch);
        })
        .catch((err) =>
          stateHandler({ message: err, isError: true }, dispatch)
        );
    } catch (error: any) {
      stateHandler({ message: error.message, isError: true }, dispatch);
    }
  };

  if (!isLogged) {
    return <AuthFirst />;
  }
  return (
    <StyledSetting>
      <div className="container">
        <p className="subtitle">Your profile</p>
        <h1 className="title">Setting</h1>
        <label htmlFor="" className="label">
          Your photo
        </label>
        <input
          type="file"
          accept="image/*"
          className="input"
          onChange={uploadHandler}
        />
        {isPercentageShow && <p className="percent">{percent}%</p>}

        {formData.cover && (
          <div className="photo">
            <Image
              src={formData.cover}
              height={250}
              width={250}
              alt="Image"
              objectFit="cover"
            />
          </div>
        )}

        <button className="btn" onClick={saveHandler}>
          Save
        </button>
      </div>
    </StyledSetting>
  );
}

const StyledSetting = styled.div`
  .input {
    margin-bottom: 25px;
  }
  .btn {
    margin-top: 25px;
  }
  .photo {
    height: 250px;
    width: 250px;
  }
  .container {
    display: flex;
    flex-direction: column;
    .label {
      margin-top: 45px;
    }
  }
`;

import { useState } from "react";
import { ImageResize } from "components/ImageResize";
import { UserAuth } from "context/AuthContext";
import { EditableAvatarStyled } from "./EditableAvatar.styles";
import { api } from "api";
type TProps = {
  src?: string;
};

export const EditableAvatar: React.FC<TProps> = (props) => {
  const { src } = props;
  const [inputFile, setInputFile] = useState("");
  const [file, setFile] = useState<File>();
  const { user, setUser } = UserAuth();

  function onSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    setInputFile(event.target.value);

    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }

  async function onSave(imageData: string) {
    if (imageData && user?.authUid) {
      api
        .put("profiles", {
          profile: { picture: imageData },
          uid: user?.authUid,
        })
        .then(() => {
          // setNewSrc(imageData);

          setUser({ ...user, picture: imageData });
        });
    }
  }

  return (
    <EditableAvatarStyled>
      <div className="image-wrapper">
        <img
          className="avatar"
          referrerPolicy="no-referrer"
          alt="Profile"
          src={src}
        />

        <div className="upload-image">
          <input
            value={inputFile}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="upload-input"
          />
          <div className="change-photo">Change Photo</div>
        </div>
      </div>

      {inputFile ? (
        <ImageResize setInputFile={setInputFile} file={file} onSave={onSave} />
      ) : null}
    </EditableAvatarStyled>
  );
};

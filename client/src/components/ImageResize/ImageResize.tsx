import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { Button } from "components/Button";
import { useDebounceEffect, canvasPreview } from "./ImageResize.utils";

import "react-image-crop/dist/ReactCrop.css";
import { ImageResizeStyled } from "./ImageResize.styles";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 100,
        height: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

type TProps = {
  setInputFile: React.Dispatch<React.SetStateAction<string>>;
  file?: File;
  onSave: (imageData: string) => void;
};

const imageSize = 400;

export const ImageResize: React.FC<TProps> = (props) => {
  const { setInputFile, onSave, file } = props;
  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState("");
  const [showImageCropper, setShowImageCropper] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [uploadedImageAspect, setUploadedImageAspect] = useState(1);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: "px",
  });
  const aspect = 1;

  useEffect(() => {
    if (file) {
      setCrop(undefined); // Makes crop preview update between images.

      const reader = new FileReader();

      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
      setShowImageCropper(true);
    }
  }, [file]);

  function onImageLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = event.currentTarget;

    setUploadedImageAspect(width / height);
    setCrop(centerAspectCrop(width, height, aspect));
  }

  async function onImageSave() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;

    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const offscreen = new OffscreenCanvas(imageSize, imageSize);
    const ctx = offscreen.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      imageSize,
      imageSize
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      // The result property of the FileReader contains the image data
      const imageData = event.target?.result;

      // You can now send this imageData to your backend or use it as needed
      // For example, you can send it as a base64-encoded string in an API request

      onSave(imageData as string);
    };

    // Read the Blob as a data URL (base64-encoded string)
    reader.readAsDataURL(blob);
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  return (
    <ImageResizeStyled
      uploadedImageAspect={uploadedImageAspect}
      className="image-resize"
    >
      <div className="crop-wrapper">
        {!!showImageCropper && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            minWidth={100}
            minHeight={100}
            maxWidth={imageSize}
            maxHeight={imageSize}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              onLoad={onImageLoad}
              className="crop-image"
            />
          </ReactCrop>
        )}
        {!!completedCrop && (
          <div>
            <canvas
              className="preview-canvas"
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
        )}
      </div>

      <div className="buttons-wrapper">
        <Button
          hoverColor="blueXLight"
          color="white"
          textColor="main"
          onClick={() => {
            setShowImageCropper(false);
            setInputFile("");
          }}
        >
          {t("close")}
        </Button>

        <Button
          hoverColor="main"
          color="secondary"
          onClick={() => {
            onImageSave();
            setShowImageCropper(false);
            setInputFile("");
          }}
        >
          {t("save")}
        </Button>
      </div>
    </ImageResizeStyled>
  );
};

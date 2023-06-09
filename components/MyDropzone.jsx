import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px dashed #eaeaea",

  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function MyDropzone({ inputProps }) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        "image/png": [".png", ".jpeg", ".jpg", ".webp"],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt="Preview of uploaded image"
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="dropzone-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps(inputProps)} />
        {isDragActive ? (
          <p>Release image to upload it</p>
        ) : (
          <p>Drop an image here to upload it</p>
        )}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      {fileRejectionItems.length > 0 ? <h4>Rejected files</h4> : null}
      <ul>{fileRejectionItems}</ul>
    </section>
  );
}
export default MyDropzone;

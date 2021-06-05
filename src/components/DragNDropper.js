import React from "react";
import { useDropzone } from "react-dropzone";

function DragNDropper({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="container-fluid">
      <div className="row card p-5" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}

export default DragNDropper;

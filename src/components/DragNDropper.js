import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { processTextContent } from "../helper";
import CharacterList from "./CharacterList";

function DragNDropper() {
  const [characterList, setCharacterList] = useState([]);
  const [textContent, setTextContent] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const filepath = acceptedFiles?.[0]?.path;
    window.api.send("toMain", filepath);

    window.api.receive("fromMain", (data) => {
      setTextContent(data);
    });

    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {textContent.length > 0 ? (
        <CharacterList
          textContent={textContent}
          setTextContent={setTextContent}
          list={characterList}
          setList={setCharacterList}
        />
      ) : (
        <div {...getRootProps()} style={{ height: "100%", width: "100%" }}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </>
  );
}

export default DragNDropper;

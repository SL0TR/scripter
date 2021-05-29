import React, { useCallback, useState } from "react";
import CharacterList from "./CharacterList";
import DragNDropper from "./DragNDropper";

function Scripter() {
  const [characterList, setCharacterList] = useState([]);
  const [textContent, setTextContent] = useState("");
  const [isWin, setIsWin] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const filepath = acceptedFiles?.[0]?.path;
    window.api.send("toMain", filepath);

    window.api.receive("fromMain", ({ text, isWin }) => {
      setTextContent(text);
      setIsWin(isWin);
    });

    // Do something with the files
  }, []);

  return (
    <>
      {textContent.length > 0 ? (
        <CharacterList
          textContent={textContent}
          setTextContent={setTextContent}
          list={characterList}
          setList={setCharacterList}
          isWin={isWin}
        />
      ) : (
        <DragNDropper onDrop={onDrop} />
      )}
    </>
  );
}

export default Scripter;

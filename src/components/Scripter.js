import React, { useRef, useState } from "react";
import CharacterList from "./CharacterList";

function Scripter() {
  const [characterList, setCharacterList] = useState([]);
  const [textContent, setTextContent] = useState("");
  const textAreaRef = useRef(null);

  const onSubmit = () => {
    const txt = textAreaRef?.current?.value;
    if (txt) {
      setTextContent(txt);
    }
  };

  return (
    <>
      {textContent ? (
        <CharacterList
          textContent={textContent}
          setTextContent={setTextContent}
          list={characterList}
          setList={setCharacterList}
          // isWin={isWin}
        />
      ) : (
        <div className="container-fluid px-5 mt-5">
          <div className="form-floating">
            <textarea
              ref={textAreaRef}
              className="form-control"
              placeholder="Leave a comment here"
              style={{ height: "300px" }}
              id="floatingTextarea2"
            ></textarea>
            <label for="floatingTextarea2">Script text</label>
            <button onClick={onSubmit} className="btn btn-primary mt-5">
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Scripter;

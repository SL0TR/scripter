import React, { useState } from "react";
import { processTextContent } from "../helper/helper";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import { tableGenerator } from "../helper/tableGenerator";

function CharacterList({
  list = [],
  setList,
  textContent,
  setTextContent,
  isWin,
}) {
  const [characterNames, setCharacterNames] = useState();
  const [fiileName, setFileName] = useState();

  function handleCharacterRemove(index) {
    const oldList = list.filter((_, i) => i !== index);
    setList(oldList);
  }

  function handleReset() {
    setList([]);
    setTextContent("");
  }

  function handleSubmit() {
    const scriptData = processTextContent({
      textContent,
      characterList: list,
      isWin,
    });

    Packer.toBlob(tableGenerator(scriptData)).then((blob) => {
      saveAs(blob, `${fiileName || "scripted"}.docx`);
    });
  }

  function handleGenerateCharacters() {
    const charactersArray = characterNames.split("\n");

    const characterList = charactersArray
      .map((el) => el?.trim())
      .filter((el) => el !== "");

    const uniqueCharacterList = new Set([...list, ...characterList]);

    setList([...uniqueCharacterList]);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <h2 className="m-2 mt-4">Character List!</h2>
        <div className="col-10">
          <ul className="list-group">
            <div className="row g-4 m-4 ">
              {list.length > 0 &&
                list.map((character, i) => (
                  <div className="col-6" key={`${character}${i}`}>
                    <li className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-9">
                          <h6>{character}</h6>
                        </div>
                        <div className="col-3">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleCharacterRemove(i)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  </div>
                ))}
            </div>
          </ul>
        </div>

        <div className="input-group " style={{ height: "100%" }}>
          <textarea
            value={characterNames}
            className="form-control"
            placeholder="Character list"
            style={{ height: "100px" }}
            id="floatingTextarea2"
            onChange={(e) => setCharacterNames(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleGenerateCharacters}
            disabled={!characterNames}
          >
            Generate List
          </button>
        </div>
        <div className="col-auto">
          <div className="input-group mt-5">
            <input
              type="text"
              className="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={fiileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Filename"
            />
            <span className="input-group-text" id="basic-addon2">
              .docx
            </span>
          </div>
        </div>

        <div className="col-12 mt-4">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterList;

import React, { useState } from "react";
import { processTextContent } from "../helper";
import { saveAs } from "file-saver";
import { Packer } from "docx";
function CharacterList({
  list = [],
  setList,
  textContent,
  setTextContent,
  isWin,
}) {
  const [characterName, setCharacterName] = useState();

  function handleCharacterAdd() {
    setList([...list, characterName]);
    setCharacterName("");
  }

  function handleCharacterRemove(index) {
    const oldList = list.filter((_, i) => i !== index);
    setList(oldList);
  }

  function handleReset() {
    setList([]);
    setTextContent("");
  }

  function handleSubmit() {
    const tableData = processTextContent({
      textContent,
      characterList: list,
      isWin,
    });
    console.log(tableData);
  }

  return (
    <div className="container-fluid">
      <h2 className="m-2 mt-4">Character List!</h2>
      <div className="row justify-content-center mt-4">
        <div className="col-10">
          <ul className="list-group">
            <div className="row g-4 m-4 justify-content-center">
              {list.length > 0 &&
                list.map((character, i) => (
                  <div className="col-6" key={`${character}${i}`}>
                    <li className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-10">
                          <h6>{character}</h6>
                        </div>
                        <div className="col-2">
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => handleCharacterRemove(i)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  </div>
                ))}
              <div className="col-6">
                <div class="input-group " style={{ height: "100%" }}>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder="Character name"
                    style={{ height: "100%" }}
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={handleCharacterAdd}
                  >
                    Add Character
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div
                class="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CharacterList;

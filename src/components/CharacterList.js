import React, { useState } from "react";
import { processTextContent } from "../helper";

function CharacterList({ list = [], setList, textContent, setTextContent }) {
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
    console.log(processTextContent(textContent, list));
  }

  return (
    <div>
      {list.length > 0 &&
        list.map((character, i) => (
          <li key={`${character}${i}`}>
            <p>{character}</p>
            <button onClick={() => handleCharacterRemove(i)}>remove</button>
          </li>
        ))}
      <input
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
        placeholder="Character name"
        type="text"
      />
      <button onClick={handleCharacterAdd}>Add Character</button>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
}

export default CharacterList;

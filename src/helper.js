export function processTextContent(textContent, characterList) {
  const textArray = textContent.split(" ");
  const script = {};

  for (const [index, elem] of textArray.entries()) {
    const characterName = getCharacterName(elem);

    // const dialouge = getDialogue();

    if (characterName) {
      script[index.toString()] = {
        characterName,
        // dialouge
      };
    }
  }

  return script;
}

function getCharacterName(charString) {
  let count = charString.match(/\n/g)?.length || 0;
  let name = null;
  if (count > 2) {
    name = charString.split("\n")[1];
  }
  return name;
}

function getDialogue() {}

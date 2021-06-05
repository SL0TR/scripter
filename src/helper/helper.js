// ALGO I
// export function processTextContent({ textContent, characterList, isWin }) {
//   const newLine = isWin ? "\r\n" : "\n";
//   const textArray = textContent.split(newLine);

//   console.log(textArray);

//   const script = {};
//   let id = 0;
//   let dialouge = "";
//   let characterName = null;

//   for (let i = 0; i <= textArray.length; i++) {
//     const charString = textArray[i];

//     // eslint-disable-next-line no-loop-func
//     characterList.forEach((el) => {
//       if (charString && charString.toLowerCase() === el.toLowerCase()) {
//         characterName = el;
//       }
//     });

//     if (characterName) {
//       dialouge = "";
//       id += 1;

//       script[id.toString()] = {
//         characterName,
//         dialouge,
//       };
//       characterName = null;
//       continue;
//     }

//     if (!characterName) {
//       dialouge += charString;

//       if (
//         script[id.toString()] &&
//         script[id.toString()].dialouge !== undefined
//       ) {
//         script[id.toString()].dialouge = dialouge;
//       }

//       characterName = null;
//     }
//   }

//   return script;
// }

// ALGO II

const initObj = {
  dialouge: "",
  characterName: null,
};
export function processTextContent({ textContent, characterList }) {
  console.log(JSON.stringify(textContent));

  const textArray = textContent.split("\n");

  console.log(textArray);

  let script = [];

  let scriptObj = { ...initObj };

  for (let i = 0; i <= textArray.length; i++) {
    const elem = textArray[i]?.trim();

    const isCharacter =
      elem &&
      characterList.some((el) => elem.toLowerCase() === el.toLowerCase());

    if (isCharacter) {
      if (scriptObj.dialouge.length && scriptObj.characterName) {
        script.push(scriptObj);

        scriptObj = {
          ...initObj,
          characterName: elem,
        };
      }

      scriptObj.characterName = elem;

      continue;
    }

    scriptObj.dialouge += elem;
  }

  return script;
}

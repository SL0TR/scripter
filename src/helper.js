export function processTextContent({ textContent, characterList, isWin }) {
  const newLine = isWin ? "\r\n" : "\n";
  const textArray = textContent.split(newLine);

  console.log(textArray);

  const script = {};
  let id = 0;
  let dialouge = "";
  let characterName = null;

  for (let i = 0; i <= textArray.length; i++) {
    const charString = textArray[i];

    // eslint-disable-next-line no-loop-func
    characterList.forEach((el) => {
      if (charString && charString.toLowerCase() === el.toLowerCase()) {
        characterName = el;
      }
    });

    if (characterName) {
      dialouge = "";
      id += 1;

      script[id.toString()] = {
        characterName,
        dialouge,
      };
      characterName = null;
      continue;
    }

    if (!characterName) {
      dialouge += charString;

      if (
        script[id.toString()] &&
        script[id.toString()].dialouge !== undefined
      ) {
        script[id.toString()].dialouge = dialouge;
      }

      characterName = null;
    }
  }

  return script;
}

// const initObj = {
//   dialouge: "",
//   characterName: null,
// };
// export function processTextContent({ textContent, characterList, isWin }) {
//   const newLine = isWin ? "\r\n" : "\n";
//   const textArray = textContent.split(newLine);

//   console.log(textArray);

//   let script = [];

//   let scriptObj = { ...initObj };

//   for (let i = 0; i <= textArray.length; i++) {
//     const charString = textArray[i];

//     // eslint-disable-next-line no-loop-func
//     // characterList.forEach((el) => {
//     //   if (charString && charString.toLowerCase() === el.toLowerCase()) {
//     //     scriptObj.dialouge = el;
//     //   }
//     // });

//     const isCharacter =
//       charString &&
//       characterList.some((el) => charString.toLowerCase() === el.toLowerCase());

//     if (isCharacter) {
//       scriptObj.characterName = charString;
//     }

//     if (!isCharacter) {
//       scriptObj.dialouge += charString;
//     }

//     if (scriptObj.dialouge.lengtth > 0 && scriptObj.characterName) {
//       script = [...script, scriptObj];
//       scriptObj = { ...initObj };
//     }
//   }

//   return script;
// }

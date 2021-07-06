import {
  Document,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
} from "docx";

export function tableGenerator(script) {
  console.log(script);

  const tableRows = script.map(
    (line) =>
      new TableRow({
        children: [
          new TableCell({
            children: [],
          }),
          new TableCell({
            children: [new Paragraph(line?.characterName)],
          }),
          new TableCell({
            children: [new Paragraph(line?.dialouge)],
          }),
          new TableCell({
            children: [],
          }),
        ],
      })
  );

  console.log(tableRows);

  const table = new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            children: [new Paragraph("সময়")],
          }),
          new TableCell({
            children: [new Paragraph("চরিত্র")],
          }),
          new TableCell({
            children: [new Paragraph("ইংরেজি সংলাপ")],
          }),
          new TableCell({
            children: [new Paragraph("বাংলা সংলাপ")],
          }),
        ],
      }),
      ...tableRows,
    ],
  });

  return new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Mohaimin Is the best boyfriend in the world",
            alignment: AlignmentType.CENTER,
          }),
          table,
        ],
      },
    ],
  });
}

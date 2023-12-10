import formidable from "formidable";
import { IncomingMessage } from "http";

export async function parse(req: IncomingMessage) {
  const form = formidable({ multiples: true });
  try {
    const [fields, files] = await form.parse(req);

    const values: any = Object.keys(fields).reduce((prev: any, i) => {
      prev[i] = fields[i]![0];
      return prev;
    }, {});

    Object.keys(files).forEach(i => {
      if (Object.keys(values).includes(i)) {
        values[i].push(files[i]);
      } else {
        values[i] = [files[i]];
      }
    });

    return values;
  } catch (err) {
    throw new Error("Unable to process request");
  }
}

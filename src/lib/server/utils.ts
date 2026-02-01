export const email_regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const one_day = 60 * 60 * 24;

export const cookie_options = {
	httpOnly: true,
	secure: true,
	path: '/',
	maxAge: one_day
};

type StructuredFormData =
  | string
  | boolean
  | number
  | File
  | StructuredFormData[];

export function formBody(body: FormData) {
  return [...body.entries()].reduce((data, [k, v]) => {
    let value: StructuredFormData = v;
    if (v === "true") value = true;
    if (v === "false") value = false;
    if (!isNaN(Number(v))) value = Number(v);

    // For grouped fields like multi-selects and checkboxes, we need to
    // store the values in an array.
    if (k in data) {
      const val = data[k];
      value = Array.isArray(val) ? [...val, value] : [val, value];
    }

    data[k] = value;

    return data;
  }, {} as Record<string, StructuredFormData>);
}
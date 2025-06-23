export function parseSelectParam<T>(fieldsParam: string | null,  defaultSelect:T,relation?:string): T | undefined {
  if (!fieldsParam) return defaultSelect;

  const fields = fieldsParam.split(',').map(f => f.trim());

  const select: any = {};

  fields.forEach(field => {
    if (field && field.startsWith(`${relation}.`)) {
      select.product = select.product || { select: {} };
      const productField = field.replace(`${relation}.`, '');
      select.product.select[productField] = true;
    } else {
      select[field] = true;
    }
  });

  return select;
}
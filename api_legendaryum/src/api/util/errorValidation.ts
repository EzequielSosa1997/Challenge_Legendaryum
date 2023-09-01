export const errorValidation = ({
  message,
  origin,
}: {
  message: string;
  origin: string;
}) => {
  throw new Error(`${message}, in the ${origin}`);
};

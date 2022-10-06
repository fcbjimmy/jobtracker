import * as yup from "yup";

export const schema = yup.object().shape({
  company: yup.string().required("Company is required!"),
  position: yup.string().required("Position is required!"),
  date: yup.string().required("date is required!"),
});

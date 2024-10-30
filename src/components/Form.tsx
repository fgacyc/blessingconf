import { Button } from "@headlessui/react";
import { type Card } from "@prisma/client";
import { Field, Form, Formik, useFormikContext } from "formik";
import { type FunctionComponent } from "react";
import * as Yup from "yup";

type CardFormType = Partial<Card>;
interface CardFormProps {
  //   onClose: () => void;
  onSubmit: (e: CardFormType, resetForm: () => void) => void;
}

export const CardForm: FunctionComponent<CardFormProps> = ({ onSubmit }) => {
  return (
    <Formik<CardFormType>
      initialValues={{
        company: "",
        contact: "",
        name: "",
        position: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Required"),
        company: Yup.string().required("Required"),
        contact: Yup.string().required("Required"),
        position: Yup.string().required("Required"),
      })}
      onSubmit={async (values, actions) => {
        try {
          onSubmit(values, actions.resetForm);
          actions.resetForm();
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex w-full flex-col gap-[10px]">
          <InputField name="name" />
          <InputField name="company" />
          <InputField name="position" />
          <InputField name="contact" />
          <div className="mt-4 w-full">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full rounded-full bg-[#191d1a] py-3 text-white"
              // onClick={() => setModalOpen(false)}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const InputField: FunctionComponent<{ name: keyof Card }> = ({
  name,
}) => {
  const { errors, isSubmitting } = useFormikContext<CardFormType>();
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={name}
          className="font-sf text-[12px] font-bold capitalize"
        >
          {name === "contact" ? "Contact/Email" : name}
        </label>
        <Field
          disabled={isSubmitting}
          name={name}
          className="w-full rounded-sm border border-[rgba(0,0,0,0.13)] bg-transparent px-1 py-2"
        />
      </div>
      <span className="w-full text-right text-[10px] italic text-red-600">
        {errors[name]}
      </span>
    </div>
  );
};

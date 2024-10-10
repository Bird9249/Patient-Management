import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import { AdvancedSelect } from "~/components/forms/advanced-select/AdvancedSelect";
import { Textarea } from "~/components/forms/textarea/Textarea";
import {
  useAppointmentLoader,
  useDoctorSelectLoader,
  useReAppointmentAction,
} from "~/routes/admin_page/details_page/[id]";
import {
  AdminSchema,
  type IAdminSchema,
} from "~/routes/admin_page/schema/adminSchema";
import { Modal } from "../Modal";

export const Schedule_Modal = component$<{ isOpen: Signal<boolean> }>(
  ({ isOpen }) => {
    const doctorLoader = useDoctorSelectLoader();
    const loader = useAppointmentLoader();
    const action = useReAppointmentAction();
    const nav = useNavigate();

    const [form, { Field, Form }] = useForm<IAdminSchema>({
      loader: {
        value: {
          doctorId: 0,
          reasonOfAdmin: "",
        },
      },
      validate: valiForm$(AdminSchema),
    });

    return (
      <>
        <Modal isOpen={isOpen} header={{ title: "Schedule Appointment" }}>
          <Form
            onSubmit$={async (values) => {
              await action.submit(values);
              if (action.value?.response.data?.success) {
                nav(`/admin_page/`);
              }
            }}
          >
            <div>
              <h1 class="mx-4 text-start text-lg text-gray-400">
                Please fill in the following details to schedule
              </h1>
            </div>
            <div class="m-4">
              <Field name="doctorId" type="number">
                {(field, props) => (
                  <AdvancedSelect
                    name={props.name}
                    options={doctorLoader.value.map(({ id, name, image }) => ({
                      label: name,
                      value: id,
                      img: import.meta.env.PUBLIC_IMAGE_URL + "/" + image,
                    }))}
                    onSelected$={(val) => {
                      setValue(
                        form,
                        "doctorId",
                        typeof val === "number" ? val : val[0],
                      );
                    }}
                    value={loader.value.data?.doctor.id}
                    error={field.error}
                    placeholder="Select your doctor"
                    required
                    label="Doctor"
                  />
                )}
              </Field>
            </div>

            <div class="mx-4 flex flex-row space-x-6">
              <div class="flex-1">
                <Field name="reasonOfAdmin">
                  {(field, props) => (
                    <Textarea
                      {...props}
                      value={field.value}
                      error={field.error}
                      label="Reason for Schedule"
                      placeholder="ex:Okay"
                      size="large"
                    />
                  )}
                </Field>
              </div>
            </div>
            <div class="mx-auto flex flex-col items-center p-5">
              <button class="mb-10 block w-full rounded-lg bg-emerald-400 px-5 py-3 text-white">
                Confirm Schedule
              </button>
            </div>
          </Form>
        </Modal>
      </>
    );
  },
);

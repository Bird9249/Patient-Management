import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import { Textarea } from "~/components/forms/textarea/Textarea";
import { useReAppointmentAction } from "~/routes/admin_page/details_page/[id]";
import {
  AdminSchema,
  type IAdminSchema,
} from "~/routes/admin_page/schema/adminSchema";
import { Modal } from "../Modal";

export const Cancel_Modal = component$<{ isOpen: Signal<boolean> }>(
  ({ isOpen }) => {

    const action = useReAppointmentAction();
    const nav = useNavigate();

    const [, { Field, Form }] = useForm<IAdminSchema>({
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
        <Modal isOpen={isOpen} header={{ title: "Cancel Appointment" }}>
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
              Are you sure you want to cancel your patient appointment
              </h1>
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
              <button class="mb-10 block w-full rounded-full bg-red-600 px-5 py-3 text-white">
                Confirm to Cancel
              </button>
            </div>
          </Form>
        </Modal>
      </>
    );
  },
);

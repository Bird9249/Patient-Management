import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import { formAction$, setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import { Button } from "~/components/button/Button";
import { AdvancedSelect } from "~/components/forms/advanced-select/AdvancedSelect";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Textarea } from "~/components/forms/textarea/Textarea";
import { Modal } from "~/components/modal/Modal";
import { db } from "~/lib/db/db";
import appointment from "../action/appointment";
import type { IAppointmentSchema } from "../schema/appointment";
import { AppointmentSchema } from "../schema/appointment";
import backgroundpage from "/public/background (1).jpg";
import logo_page from "/public/logo project.png";

export const useDoctorLoader = routeLoader$(async () => {
  return await db.query.doctor.findMany({
    columns: {
      id: true,
      name: true,
      image: true,
    },
  });
});

export const useAppointmentAction = formAction$<
  IAppointmentSchema,
  { success: boolean; message: string; id?: number }
>(async (values, { params }) => {
  try {
    const res = await appointment(values, Number(params.accountId));

    return {
      data: {
        success: true,
        message: "Appointment successfully!",
        id: res,
      },
    };
  } catch (error) {
    return {
      data: {
        success: false,
        message: (error as Error).message,
      },
    };
  }
}, valiForm$(AppointmentSchema));

export default component$(() => {
  const loader = useDoctorLoader();
  const action = useAppointmentAction();
  const isOpen = useSignal<boolean>(false);
  const nav = useNavigate();
  const { params } = useLocation();

  const [form, { Field, Form }] = useForm<IAppointmentSchema>({
    loader: {
      value: {
        reasonOfAppointment: "i'm sick",
        dateTime: "",
        doctorId: 0,
        comment: "",
      },
    },
    validate: valiForm$(AppointmentSchema),
  });

  return (
    <Form
      onSubmit$={async (values) => {
        const res = await action.submit(values);

        if (res.value.response.data?.success) {
          isOpen.value = true;
        }
      }}
    >
      <div class="relative flex min-h-screen flex-col justify-center bg-white">
        <img
          class="absolute h-screen w-screen brightness-110"
          src={backgroundpage}
          alt=""
          width={0}
          height={0}
        />
        <div class="z-10">
          <div class="mb-12 ml-28">
            <img class="w-20" src={logo_page} width={0} height={0} />
            <span class="ml-1 text-sm font-semibold">SnatBas Clinic</span>
          </div>
          <div class="ml-32">
            <h1 class="mb-4 text-3xl">Hey There 👋</h1>
            <p class="mb-6">Request a new appointment in 10 seconds</p>
            <div class="w-full max-w-screen-lg rounded-lg bg-gray-50 p-8 text-black">
              <div class="mb-4">
                {/* Dropdown */}
                <Field name="doctorId" type="number">
                  {(field, props) => (
                    <AdvancedSelect
                      name={props.name}
                      options={loader.value.map(({ id, name, image }) => ({
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
                      value={field.value}
                      error={field.error}
                      placeholder="Select your doctor"
                      required
                      label="Doctor"
                    />
                  )}
                </Field>

                <br />
                {/* textarea */}
                <div class="flex flex-row space-x-6">
                  <div class="flex-1">
                    <Field name="reasonOfAppointment">
                      {(field, props) => (
                        <Textarea
                          {...props}
                          value={field.value}
                          error={field.error}
                          label="Reason for appointment"
                          placeholder="ex: Annual monthly check-up"
                          size="large"
                        />
                      )}
                    </Field>
                  </div>

                  <div class="flex-1">
                    <Field name="comment">
                      {(field, props) => (
                        <Textarea
                          {...props}
                          value={field.value}
                          error={field.error}
                          label="Additional comments/notes"
                          placeholder="ex: Prefer afternoon appointments, if possible"
                          size="large"
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <br />

                <Field name="dateTime">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      label="Expected appointment date"
                      type="datetime-local"
                    />
                  )}
                </Field>
                <br />

                <Button
                  block
                  variant="solid"
                  type="submit"
                  isLoading={action.isRunning}
                >
                  Submit and continue
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={isOpen}>
          success
          <Button
            type="button"
            onClick$={async () => {
              await nav(`/history/${params.accountId}/`);
            }}
          >
            Ok
          </Button>
        </Modal>
      </div>
    </Form>
  );
});

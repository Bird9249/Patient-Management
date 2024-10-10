import { component$, useSignal } from "@builder.io/qwik";
import { formAction$, setValue, useForm, valiForm$ } from "@modular-forms/qwik";

import { AdvancedSelect } from "~/components/forms/advanced-select/AdvancedSelect";
import { Modal } from "~/components/modal/Modal";
import { AppointmentSchema, IAppointmentSchema } from "../../appointment/schema/appointment";
import { appointment } from "~/lib/db/schema";
import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "~/lib/db/db";
import { Textarea } from "~/components/forms/textarea/Textarea";
import { eq } from "drizzle-orm";
import { useDoctorLoader } from "~/routes/appointment/[accountId]";

export const useDoctorSelectLoader = routeLoader$(async () => {
  return await db.query.doctor.findMany({
    columns: {
      id: true,
      name: true,
      image: true,
    },
  });
});

export const useReAppointmentAction = formAction$<
  IAppointmentSchema,
  { success: boolean; message: string; id?: number }
>(async (values, { params }) => {
  try {
    const res = await db.update(appointment).set({status: 'scheduled', doctorId: values.doctorId, reasonOfScheduled: values.reasonOfScheduled }).where(eq(appointment.id, 1 ))

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

export default component$(()=>{
    const isOpen= useSignal<boolean>(true);
    const loader = useDoctorSelectLoader();
    const action = useReAppointmentAction();
    // const { params } = useLocation();
  
    const [form, { Field, Form }] = useForm<IAppointmentSchema>({
      loader: {
        value: {
          reasonOfAppointment: "",
          dateTime: "",
          doctorId: 0,
          comment: "",
          reasonOfScheduled: undefined,
          reasonOfCancelled: undefined,
          updatedAt: undefined
        },
      },
      validate: valiForm$(AppointmentSchema),
    });
  

    return(
        <>
        <Modal isOpen={isOpen} header={{title:"Schedule Appointment"}}>
            <Form>
              <div>
                  <h1 class="mx-4 text-start text-gray-400 text-lg">
                  Please fill in the following details to schedule
                  </h1>
              </div>
              <div class="m-4" >

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
                </div>

                <div class="mx-4 flex flex-row space-x-6">
                  <div class="flex-1">
                    <Field name="reasonOfScheduled">
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
                <div class="mx-auto p-5 flex flex-col items-center">
                  <button class="px-5 py-1 bg-emerald-400 text-white rounded-full">
                  Confirm Schedule
                  </button>
                </div>
                

            </Form>


        </Modal>

        </>
    )
});
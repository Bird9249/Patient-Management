import { component$, noSerialize } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { formAction$, setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import { eq } from "drizzle-orm";
import { AdvancedSelect } from "~/components/forms/advanced-select/AdvancedSelect";
import PreviewImage from "~/components/forms/preview-image/PreviewImage";
import { Redio } from "~/components/forms/radio/Radio";
import { Select } from "~/components/forms/select/Select";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Textarea } from "~/components/forms/textarea/Textarea";
import { db } from "~/lib/db/db";
import { account } from "~/lib/db/schema";
import { uploadFile } from "~/utils/file";
import generate_file_name from "~/utils/generate_file_name";
import image_background from "../../../../public/image.png";
import image_logo from "../../../../public/logo project.png";
import { addUserInfo } from "../Actions/userInfo";
import {
  IRegisterSchema,
  IRegisterServerSchema,
  RegisterSchema,
  RegisterServerSchema,
} from "../schema/register";

// server
export const useAddUser = formAction$<
  IRegisterServerSchema,
  { message: string; success: boolean; id?: number }
>(async (user, { params }) => {
  try {
    const id = await addUserInfo(user, Number(params.accountId));

    return {
      data: { success: true, message: "Add user successful", id },
    };
  } catch (error) {
    console.error(error);

    return { data: { message: (error as Error).message, success: false } };
  }
}, valiForm$(RegisterServerSchema));

export const useDoctorLoader = routeLoader$(async function () {
  return await db.query.doctor.findMany({
    columns: { id: true, image: true, name: true },
  });
});

export const useAccountLoader = routeLoader$(async ({ params, redirect }) => {
  const res = await db.query.account.findFirst({
    where: eq(account.id, Number(params.accountId)),
    columns: {
      password: false,
      createdAt: false,
    },
  });

  if (res) return res;
  else throw redirect(301, "/information/1");
});

// browser
export default component$(() => {
  const doctorLoader = useDoctorLoader();
  const accountLoader = useAccountLoader();
  const action = useAddUser();

  const [form, { Field, Form }] = useForm<IRegisterSchema>({
    loader: {
      value: {
        userInfo: {
          name: accountLoader.value.name,
          email: accountLoader.value.email || "",
          phone: accountLoader.value.phone,
          // name: "",
          // email: "",
          // phone: "",
          address: "",
          dayOfBirth: "",
          emergencyName: "",
          emergencyPhone: "",
          gender: "MALE",
          occupation: "",
        },
        identify: {
          type: "ID_CARD",
          number: "",
          image: undefined,
        },
        medicalInfo: {
          doctorId: 0,
          insuranceName: "",
          insuranceNumber: "",
          allergies: "",
          currentMedication: "",
          familyMedicalHistory: "",
          medicalHistory: "",
        },
      },
    },
    validate: valiForm$(RegisterSchema),
  });

  return (
    <Form
      onSubmit$={async (values) => {
        // await
        const fileName = generate_file_name(
          values.identify.image!.name,
          "identify/",
        );
        const res = await action.submit({
          userInfo: values.userInfo,
          identify: { ...values.identify, image: fileName },
          medicalInfo: values.medicalInfo,
        });
        if (res.value.response.data?.success) {
          await uploadFile(values.identify.image!, fileName);
        } else {
          // handleError
        }
      }}
    >
      {/* main div */}
      <div class=" flex h-full w-screen">
        {/* page1 */}
        <div class="flex-1">
          {/* logo */}
          <div class="ml-[110px] mt-[54px] h-[80px] w-[120px] ">
            <img src={image_logo} alt="logo" width={84} height={54} />
            <p class="ml-1 text-sm font-semibold text-black">SnatBas Clinic</p>
          </div>
          {/* Hi.. */}
          <div class="ml-[134px] mt-[48px] w-full text-black">
            <p class="text-4xl font-normal">Hi, How Are you ...</p>
            <p class="text-mg text-gray-500">Let us know more about yourself</p>
          </div>
        </div>
        {/* image background */}
        <div class="flex-initial grow-0">
          <img
            class="right-0 top-0 h-screen"
            src={image_background}
            alt="background"
            width={700}
            height={100}
          />
        </div>
        {/* Personal information */}
        <div class="absolute flex h-auto w-screen">
          <div class=" mx-[134px] mt-72 flex-1 justify-center rounded-3xl bg-[#fbfbfb]">
            <div class="flex-1 space-y-4 p-5">
              <h1 class=" text-2xl font-medium text-black">
                Personal Information
              </h1>
              {/* full name */}
              <Field name="userInfo.name">
                {(field, props) => (
                  <TextInput
                    {...props}
                    value={field.value}
                    error={field.error}
                    label="Full name"
                    placeholder="ex: Jennifer hunt"
                    type="text"
                    required
                  />
                )}
              </Field>

              {/* email, phone, gender */}
              <div class="grid grid-cols-2 gap-5 space-y-4">
                <div class="mt-4">
                  {/* email address */}
                  <Field name="userInfo.email">
                    {(field, props) => (
                      <TextInput
                        {...props}
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-mail text-gray-500"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        }
                        value={field.value}
                        error={field.error}
                        label="Email Address"
                        placeholder="some123@gmail.com"
                        type="email"
                      />
                    )}
                  </Field>
                </div>
                {/* phone Number */}
                <Field name="userInfo.phone">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-phone text-gray-500"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      }
                      value={field.value}
                      error={field.error}
                      label="Phone Number"
                      placeholder="+856 20 xx xxx xxx"
                      type="tel"
                    />
                  )}
                </Field>
                {/* Date of birth */}
                <Field name="userInfo.dayOfBirth">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-calendar-days text-gray-500"
                        >
                          <path d="M8 2v4" />
                          <path d="M16 2v4" />
                          <rect width="18" height="18" x="3" y="4" rx="2" />
                          <path d="M3 10h18" />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                      }
                      label="Date of Birth"
                      type="date"
                    />
                  )}
                </Field>
                <div class="flex ">
                  {/* gender */}
                  <div class="absolute mb-2 block text-sm font-medium">
                    <label>Gender</label>
                  </div>
                  {/* radio */}
                  <div class="flex flex-1 gap-5 pt-7">
                    {[
                      { label: "Male", value: "MALE" },
                      { label: "Female", value: "FEMALE" },
                      { label: "Other", value: "OTHER" },
                    ].map(({ label, value }) => (
                      <Field key={value} name="userInfo.gender">
                        {(field, props) => (
                          <Redio
                            {...props}
                            label={label}
                            value={value}
                            error={field.error}
                            checked={field.value === value}
                          />
                        )}
                      </Field>
                    ))}
                  </div>
                </div>
                <Field name="userInfo.address">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      label="Address"
                      placeholder="village, district, province."
                      type="text"
                    />
                  )}
                </Field>
                <Field name="userInfo.occupation">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      label="Occupation"
                      placeholder="Actor, Engineer,..."
                      type="text"
                    />
                  )}
                </Field>
                <Field name="userInfo.emergencyName">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      label="Emergency Contact Name"
                      placeholder="Boulom..."
                      type="text"
                    />
                  )}
                </Field>
                <Field name="userInfo.emergencyPhone">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      label="Phone number"
                      placeholder="+856 20 xx xxx xxx"
                      type="tel"
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* page2 */}
      <div class=" flex h-full w-screen">
        {/* page2 */}
        <div class="flex-1">
          {/* main-div-form */}
          <div class="absolute h-auto w-screen">
            {/* Medical information */}
            <div class="mx-[134px] mt-28 rounded-3xl bg-[#fbfbfb] p-5">
              <div class="space-y-4">
                <h1 class=" text-2xl font-medium text-black">
                  Medical Information
                </h1>
                {/* doctorId */}
                {/* TODO: drop down */}
                <Field name="medicalInfo.doctorId" type="number">
                  {(field, props) => (
                    <AdvancedSelect
                      name={props.name}
                      // import .env brpwser
                      options={doctorLoader.value.map(
                        ({ id, name, image }) => ({
                          label: name,
                          value: id,
                          img: import.meta.env.PUBLIC_IMAGE_URL + "/" + image,
                        }),
                      )}
                      value={field.value}
                      error={field.error}
                      onSelected$={(val) => {
                        setValue(form, "medicalInfo.doctorId", val as number);
                      }}
                      placeholder="select your doctor"
                      label="Primary care physical"
                      class="text-gray-500"
                    />
                  )}
                </Field>
                {/* div */}
                <div class="grid grid-cols-2 gap-5 space-y-4">
                  {/* insurance name */}
                  <div class="mt-4">
                    <Field name="medicalInfo.insuranceName">
                      {(field, props) => (
                        <TextInput
                          {...props}
                          value={field.value}
                          error={field.error}
                          label="Insurance Provider"
                          placeholder="ex: Jacorp"
                          type="text"
                        />
                      )}
                    </Field>
                  </div>
                  {/* insurance_Number */}
                  <Field name="medicalInfo.insuranceNumber">
                    {(field, props) => (
                      <TextInput
                        {...props}
                        value={field.value}
                        error={field.error}
                        label="Insurance Policy Number"
                        placeholder="ex:ABC1234"
                        type="text"
                      />
                    )}
                  </Field>
                  {/* allergies */}
                  <Field name="medicalInfo.allergies">
                    {(field, props) => (
                      <Textarea
                        {...props}
                        value={field.value}
                        error={field.error}
                        label="Allergies (if any)"
                        placeholder="ex: Peanuts, Penicillin, Pollen"
                      />
                    )}
                  </Field>
                  {/* current medication */}
                  <Field name="medicalInfo.currentMedication">
                    {(field, props) => (
                      <Textarea
                        {...props}
                        value={field.value}
                        error={field.error}
                        label="Current Medication"
                        placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
                      />
                    )}
                  </Field>
                  {/* Family medical history (if relevant) */}
                  <Field name="medicalInfo.familyMedicalHistory">
                    {(field, props) => (
                      <Textarea
                        {...props}
                        value={field.value}
                        error={field.error}
                        label="Family medical history (if relevant)"
                        placeholder="ex: Mother had breast cancer"
                      />
                    )}
                  </Field>
                  {/* Past medical histiory */}
                  <Field name="medicalInfo.medicalHistory">
                    {(field, props) => (
                      <Textarea
                        {...props}
                        value={field.value}
                        error={field.error}
                        label="Past medical histiory"
                        placeholder="ex: Asthma diagnosis in childhood"
                      />
                    )}
                  </Field>
                </div>
              </div>
            </div>
            {/* identification and Verification */}
            <div class="mx-[134px] mt-10 rounded-3xl bg-[#fbfbfb] p-5">
              <div class="space-y-4">
                <h1 class=" text-2xl font-medium text-black">
                  Identification and Verification
                </h1>
                {/* doctorId */}
                {/* TODO: drop down */}
                <Field name="identify.type">
                  {(field, props) => (
                    <Select
                      {...props}
                      options={[
                        { label: "Family Book", value: "FAMILY_BOOK" },
                        { label: "ID Card", value: "ID_CARD" },
                        { label: "Driver License", value: "DRIVER_LICENSE" },
                        { label: "Passport", value: "PASSPORT" },
                      ]}
                      value={field.value}
                      error={field.error}
                      placeholder="Select Something"
                      label="Doctor"
                    />
                  )}
                </Field>
                {/* div */}
                <div class="mt-4 space-y-4">
                  {/* Identify number */}
                  <Field name="identify.number">
                    {(field, props) => (
                      <TextInput
                        {...props}
                        value={field.value}
                        error={field.error}
                        label="identification Number"
                        placeholder="ex: 48655xxxx"
                        type="text"
                      />
                    )}
                  </Field>
                  {/* image upload */}
                  <Field name="identify.image" type="File">
                    {(field, props) => (
                      <PreviewImage
                        id={props.name}
                        name={props.name}
                        error={field.error}
                        label="identification Image"
                        onFileSelect$={(file) => {
                          if (file)
                            setValue(form, "identify.image", noSerialize(file));
                          else setValue(form, "identify.image", undefined);
                        }}
                        maxSizeText="1000px x 750px"
                        browseText="browse your image"
                      />
                    )}
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* image background */}
        <div class="flex-initial grow-0">
          <img
            class="right-0 top-0 h-screen"
            src={image_background}
            alt="background"
            width={700}
            height={100}
          />
        </div>
      </div>
      {/* page3 */}
      <div class=" flex h-full w-screen">
        {/* page3 */}
        <div class="flex-1"></div>
        {/* image background */}
        <div class="flex-initial grow-0">
          <img
            class="right-0 top-0 h-screen"
            src={image_background}
            alt="background"
            width={700}
            height={100}
          />
        </div>
      </div>
    </Form>
  );
});

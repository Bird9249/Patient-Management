import { component$ } from "@builder.io/qwik";
import { formAction$, setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import { LuCalendarDays, LuMail, LuPhone } from "@qwikest/icons/lucide";
import { AdvancedSelect } from "~/components/forms/advanced-select/AdvancedSelect";
import { Redio } from "~/components/forms/radio/Radio";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Textarea } from "~/components/forms/textarea/Textarea";
import image_background from "../information/img/image.png";
import image_logo from "../information/img/logo project.png";
import {
  IRegisterSchema,
  RegisterSchema,
} from "../information/schema/register";
import { UserInfoSchema } from "../information/schema/userInfo";
import { addUserInfo } from "./Actions/userInfo";

export const useAddUser = formAction$<
  IRegisterSchema,
  { message: string; success: boolean; id?: number }
>(async (user) => {
  try {
    const id = await addUserInfo(user);

    return {
      data: { success: true, message: "Add user successful", id },
    };
  } catch (error) {
    console.error(error);

    return { data: { message: (error as Error).message, success: false } };
  }
}, valiForm$(UserInfoSchema));

export default component$(() => {
  const action = useAddUser();

  const [form, { Field, Form }] = useForm<IRegisterSchema>({
    loader: {
      value: {
        userInfo: {
          accountId: 0,
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
          image: "",
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
        await 
      }}
    >
      {/* main div */}
      <div class=" flex h-full w-screen">
        {/* page1 */}
        <div class="flex-1">
          {/* logo */}
          <div class="ml-[110px] mt-[54px] h-[80px] w-[120px] ">
            <img src={image_logo} alt="logo" width={84} height={54} />
            <p class="text-sm ml-1 text-black">SnatBas Clinic</p>
          </div>
          {/* Hi.. */}
          <div class="ml-[134px] mt-[182px] text-black ">
            <p class="text-4xl font-normal">Hi, How Are you ...</p>
            <p class="text-mg text-gray-600">Let us know more about yourself</p>
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
        <div class="absolute z-10 mx-40 mt-72 w-[70%] justify-center rounded-3xl bg-[#fbfbfb]">
          <div class="mx-5 my-5 space-y-4">
            <h1 class=" text-2xl font-medium text-black">
              Personal Information
            </h1>
            {/* full name */}
            <Field name="account.name">
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
                <Field name="account.email">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      icon={<LuMail />}
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
              <Field name="account.phone">
                {(field, props) => (
                  <TextInput
                    {...props}
                    icon={<LuPhone />}
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
                    icon={<LuCalendarDays />}
                    label="Date of Birth"
                    placeholder="YYYY/MM/DD"
                    type="date"
                  />
                )}
              </Field>
              <div class="flex ">
                {/* gender */}
                <div class="absolute mb-2 block w-full text-sm font-medium">
                  <label>Gender</label>
                </div>
                {/* radio */}
                <div class="flex flex-1 gap-5 pt-7">
                  {
                    ["MALE", "FEMALE", "OTHER"].map((e) => 
                       <Redio 
                        label={e} 
                        name={e} 
                        checked 
                        ref={}
                        onBlur$={console.log}
                        onChange$={console.log}
                        onInput$={console.log}
                         />
                    )
                  }
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
      {/* page2 */}
      <div class=" flex h-full w-screen">
        {/* page2 */}
        <div class="flex-1">
          {/* Medical information */}
          <div class="absolute z-10 mx-40 mt-32 w-[70%] justify-center rounded-3xl bg-[#fbfbfb]">
            <div class="mx-5 my-5 space-y-4">
              <h1 class=" text-2xl font-medium text-black">
                Medical Information
              </h1>
              {/* doctorId */}
              {/* TODO: drop down */}
              <Field name="medicalInfo.doctorId" type="number">
                {(field, props) => (
                  <AdvancedSelect
                    name={props.name}
                    options={[{ label: "test", value: 1 }]}
                    value={field.value}
                    error={field.error}
                    onSelected$={(val) => {
                      setValue(form, "medicalInfo.doctorId", val as number);
                    }}
                    placeholder="Select Something"
                    label="Doctor"
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
                {/* Past medical histiory Secondary */}
                <Field name="medicalInfo.medicalHistory">
                  {(field, props) => (
                    <Textarea
                      {...props}
                      value={field.value}
                      error={field.error}
                      label="Past medical histiory Secondary"
                      placeholder="ex: Asthma diagnosis in childhood"
                    />
                  )}
                </Field>
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
        <div class="flex-1">
          {/* identification and verification */}
             
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
    </Form>
  );
});

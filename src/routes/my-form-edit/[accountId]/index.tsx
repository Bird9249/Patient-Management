import { component$, noSerialize } from "@builder.io/qwik";
import logo_imge from "../../../../public/logo project.png";
import { Link } from "@builder.io/qwik-city";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import { EditFormSchema, type IEditFromSchema } from "../schema/edit";
import { Radio } from "~/components/forms/radio/Radio";
import { Checkbox } from "~/components/forms/checkbox/Checkbox";
import { Button } from "~/components/button/Button";
import PreviewImage from "~/components/forms/preview-image/PreviewImage";
import { Select } from "~/components/forms/select/Select";

export default component$(() => {
  const [form, { Field, Form }] = useForm<IEditFromSchema>({
    loader: {
      value: {
        userInfo: {
          name: "",
          email: "",
          phone: "",
          address: "",
          dayOfBirth: "",
          emergencyName: "",
          emergencyPhone: "",
          gender: "male",
          occupation: "",
        },
        identify: {
          type: "id_card",
          number: "",
          image: undefined,
          receiveTreatmentHealth: false,
          disclosureHealthInformation: false,
          acKnowledgeReviewAndAgree: false,
        },
      },
    },
    validate: valiForm$(EditFormSchema),
  });
  return (
    <Form>
      <div class="container mx-auto my-8 h-screen px-8">
        <div class="mb-12 flex items-center justify-between">
          {/* logo */}
          <div class="">
            <img src={logo_imge} alt="" width={84} height={54} />
            <p class="ml-1 text-sm font-semibold text-black">SnatBas Clinic</p>
          </div>

          {/* link  */}
          <div class="mr-10 ">
            <ul class="flex items-center gap-x-8">
              <li>
                <Link href="#" class=" text-primary-700">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" class=" text-primary-700">
                  my form
                </Link>
              </li>
              <li>
                <Link href="#" class=" text-primary-700">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#" class=" text-primary-700">
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* text*/}
        <div class="w-full text-black">
          <p class="text-4xl font-normal">My Form</p>
          <p class="text-mg text-gray-500">
            You can edit and Change information to be correct
          </p>
        </div>

        {/* Personal Information */}
        <div class=" flex-1 justify-center rounded-3xl bg-gray-50">
          <div class="space-y-4 p-5">
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
                    required
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
                    required
                  />
                )}
              </Field>

              <div class="flex ">
                {/* gender */}
                <div class="absolute mb-2 block text-sm font-medium">
                  <label>Gender</label>
                </div>
                {/* radio */}
                <div class="mx-auto flex flex-auto gap-4 pt-7">
                  {[
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                    { label: "Other", value: "OTHER" },
                  ].map(({ label, value }) => (
                    <Field key={value} name="userInfo.gender">
                      {(field, props) => (
                        <Radio
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                )}
              </Field>
            </div>
          </div>
        </div>
        {/* identification and Verification */}
        <div class=" flex-1 justify-center rounded-3xl bg-gray-50">
          <div class="space-y-4 p-5">
            <h1 class=" text-2xl font-medium text-black">
              Identification and Verification
            </h1>
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
                  label="Identify Type"
                />
              )}
            </Field>

            {/* div */}
            <div class="mt-4 space-y-8">
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
                    required
                  />
                )}
              </Field>

              {/* image upload */}
              <Field name="identify.image" type="File">
                {(field, props) => (
                  <PreviewImage
                    size="large"
                    id={props.name}
                    name={props.name}
                    error={field.error}
                    label="Scan copy of identification Document"
                    onFileSelect$={(file) => {
                      if (file)
                        setValue(form, "identify.image", noSerialize(file));
                      else setValue(form, "identify.image", undefined);
                    }}
                    maxSizeText="1000px x 750px"
                    browseText="Drop your files here or "
                  />
                )}
              </Field>
            </div>
          </div>
        </div>

        {/* check box */}
        <div class=" flex-1 justify-center rounded-3xl bg-cyan-50">
          <div class="space-y-4 p-5">
            <h1 class="text-3xl text-black">Consent and Privacy</h1>
            <Field name="identify.receiveTreatmentHealth" type="boolean">
              {(field, props) => (
                <Checkbox
                  {...props}
                  label="I consent to receive treatment for my health condition."
                  error={field.error}
                  checked={field.value}
                />
              )}
            </Field>
            <Field name="identify.disclosureHealthInformation" type="boolean">
              {(field, props) => (
                <Checkbox
                  {...props}
                  label="I consent to the use and disclosure of my health information for treatment purposes."
                  error={field.error}
                  checked={field.value}
                />
              )}
            </Field>
            <Field name="identify.acKnowledgeReviewAndAgree" type="boolean">
              {(field, props) => (
                <Checkbox
                  {...props}
                  label="I acknowledge that I have reviewed and agree to the privacy policy."
                  error={field.error}
                  checked={field.value}
                />
              )}
            </Field>
          </div>
        </div>
        {/* button submit and continue */}
        <div>
          <Button
            block
            variant="solid"
            type="submit"
            isLoading={form.submitting}
          >
            Submit and continue
          </Button>
        </div>
      </div>
    </Form>
  );
});

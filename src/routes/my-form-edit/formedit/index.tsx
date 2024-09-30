import { IEditFromSchema } from "../schema/edit";

export default component$(() => {
    const doctorLoader = useDoctorLoader();
    const accountLoader = useAccountLoader();
    const action = useAddUser();
    const nav = useNavigate();
  
    const [form, { Field, Form }] = useForm<IEditFromSchema>({
      loader: {
        value: {
          userInfo: {
            name: accountLoader.value.name,
            email: accountLoader.value.email || "",
            phone: accountLoader.value.phone.replace("+85620", ""),
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
        class="mb-14"
        onSubmit$={async (values) => {
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
  
            await nav(`/appointment/${res.value.response.data.id}/`);
          } else {
            alert("your image can not upload, please try again");
          }
        }}
      >
        <img
          class="fixed right-0 top-0 -z-10 h-screen w-[50vw] object-cover"
          src={background}
          alt="background"
          width={0}
          height={0}
        />
        <div class="container mx-auto my-8 px-8">
          {/* logo */}
          <div class="mb-12">
            <img src={image_logo} alt="logo" width={84} height={54} />
            <p class="ml-1 text-sm font-semibold text-black">SnatBas Clinic</p>
          </div>
          {/* Hi.. */}
          <div class="w-full text-black">
            <p class="text-4xl font-normal">Hi, How Are you ...</p>
            <p class="text-mg text-gray-500">Let us know more about yourself</p>
          </div>
        </div>
        {/* main div */}
        <div class="container mx-auto px-8">
          {/* form */}
          <div class="flex h-auto w-full flex-col space-y-8">
            {/* Personal information */}
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
import { component$, noSerialize, useSignal } from "@builder.io/qwik";
import {
  Link,
  routeAction$,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { formAction$, setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import { LuChevronDown, LuLogOut, LuUser2 } from "@qwikest/icons/lucide";
import { eq } from "drizzle-orm";
import { Button } from "~/components/button/Button";
import PreviewImage from "~/components/forms/preview-image/PreviewImage";
import { Radio } from "~/components/forms/radio/Radio";
import { Select } from "~/components/forms/select/Select";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Modal } from "~/components/modal/Modal";
import { db } from "~/lib/db/db";
import { account, identify, userInfo } from "~/lib/db/schema";
import { uploadFile } from "~/utils/file";
import generate_file_name from "~/utils/generate_file_name";
import type {
  IEditFromSchema,
  IEditFromServerSchema,
} from "../schema/myFormSchema";
import { EditFormSchema, EditFormServerSchema } from "../schema/myFormSchema";
import background from "/image.png";
import image_logo from "/logo project.png";

// server
export const useUpdateUser = formAction$<
  IEditFromServerSchema,
  { message: string; success: boolean }
>(async (user, { params }) => {
  try {
    await db.transaction(async (tx) => {
      const [{ id }] = await tx
        .update(userInfo)
        .set({
          gender: user.userInfo.userInfo.gender,
          dateOfBirth: user.userInfo.userInfo.dayOfBirth,
          address: user.userInfo.userInfo.address,
          occupation: user.userInfo.userInfo.occupation,
          emergencyName: user.userInfo.userInfo.emergencyName,
          emergencyPhone: `+85620${user.userInfo.userInfo.emergencyPhone}`,
        })
        .where(eq(userInfo.accountId, Number(params.accountId)))
        .returning({
          id: userInfo.id,
        });

      await tx
        .update(account)
        .set({
          name: user.userInfo.userInfo.name,
          email: user.userInfo.userInfo.email,
          phone: `+85620${user.userInfo.userInfo.phone}`,
        })
        .where(eq(account.id, Number(params.accountId)));

      await tx
        .update(identify)
        .set({
          type: user.identify.type,
          number: user.identify.number,
          image: user.identify.image,
        })
        .where(eq(identify.userinfoId, id));
    });
    return {
      data: {
        success: true,
        message: "Update user successful",
      },
    };
  } catch (error) {
    console.error(error);

    return { data: { message: (error as Error).message, success: false } };
  }
}, valiForm$(EditFormServerSchema));

export const useUserInfoLoader = routeLoader$(
  async ({ redirect, sharedMap }) => {
    const auth = sharedMap.get("auth");
    const res = await db.query.userInfo.findFirst({
      columns: {
        gender: true,
        address: true,
        dateOfBirth: true,
        emergencyName: true,
        emergencyPhone: true,
        occupation: true,
      },
      with: {
        identify: {
          columns: {
            type: true,
            number: true,
            image: true,
          },
        },
        account: {
          columns: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
      where: eq(userInfo.accountId, Number(auth.sub)),
    });
    console.log("my form auth:", auth);
    if (res) return res;
    else throw redirect(301, "/log_in");
  },
);

export const useLogoutAction = routeAction$(async (values, { cookie }) => {
  cookie.delete("auth-token", { path: "/" });

  return {
    success: true,
  };
});

// browser
export default component$(() => {
  const userInfoLoader = useUserInfoLoader();
  const action = useUpdateUser();
  const nav = useNavigate();
  const { params } = useLocation();
  const logoutAction = useLogoutAction();
  const isOpen = useSignal<boolean>(false);

  const [form, { Field, Form }] = useForm<IEditFromSchema>({
    loader: {
      value: {
        userInfo: {
          userInfo: {
            name: userInfoLoader.value!.account.name,
            email: userInfoLoader.value.account.email || "",
            phone: userInfoLoader.value!.account.phone.replace("+85620", ""),
            address: userInfoLoader.value!.address,
            dayOfBirth: userInfoLoader.value!.dateOfBirth,
            emergencyName: userInfoLoader.value!.emergencyName,
            emergencyPhone: userInfoLoader.value!.emergencyPhone.replace(
              "+85620",
              "",
            ),
            gender: userInfoLoader.value!.gender,
            occupation: userInfoLoader.value!.occupation,
          },
        },
        identify: {
          type: userInfoLoader.value!.identify.type,
          number: userInfoLoader.value!.identify.number,
          image: undefined,
        },
      },
    },
    validate: valiForm$(EditFormSchema),
  });

  return (
    <Form
      class="mb-10"
      onSubmit$={async (values) => {
        const fileName = generate_file_name(
          values.identify.image!.name,
          "identify/",
        );
        const res = await action.submit({
          userInfo: values.userInfo,
          identify: { ...values.identify, image: fileName },
        });
        if (res.value.response.data?.success) {
          await uploadFile(values.identify.image!, fileName);

          await nav(`/page_home_user/${params.accountId}/`);
        } else {
          console.log("error :", res.value.errors);
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
        {/* nav */}
        <div class="mb-5 flex w-full flex-row justify-between">
          <nav class="mx-auto w-full sm:flex sm:items-center sm:justify-between">
            {/* logo */}
            <div class="flex flex-col">
              <img src={image_logo} alt="logo" width={84} height={54} />
              <p class="ml-1 text-sm font-semibold text-black">
                SnatBas Clinic
              </p>
            </div>
            <div class="flex-1">
              <div class="flex flex-col gap-14 text-lg font-normal  text-black  sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
                <a
                  class="hover:text-primary-800"
                  href={`/page_home_user/${params.accountId}/`}
                  aria-current="page"
                >
                  Home
                </a>
                <a
                  class="flex flex-row items-center gap-1 hover:text-primary-800 "
                  href="#"
                >
                  Profile
                  <LuChevronDown class="size-4" />
                </a>
                <a class="hover:text-primary-800" href="#">
                  Contact us
                </a>
                <button
                  class="flex flex-row items-center gap-1 hover:text-primary-800  "
                  onClick$={() => {
                    isOpen.value = true;
                  }}
                >
                  <LuUser2 />
                  Log out
                </button>
              </div>
            </div>
            <Modal isOpen={isOpen}>
              <div class="mb-10 flex flex-col items-center justify-center space-y-14 p-5">
                <div class="flex text-red-500">
                  <LuLogOut class="size-20 " />
                </div>
                <div class="flex text-2xl">Do you confirm to LOG OUT ?</div>
                <div class=" flex gap-14">
                  <button
                    type="button"
                    class="inline-flex h-11 w-28 items-center justify-center rounded-full border border-transparent bg-red-500 px-3 py-2 text-base font-medium text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    onClick$={async () => {
                      await nav(`/page_home_user/${params.accountId}/`);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick$={async () => {
                      const res = await logoutAction.submit();
                      console.log(res);

                      if (res.value.success) {
                        await nav("/log_in/");
                      }
                    }}
                    class="inline-flex h-11 w-28 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-red-500 hover:bg-gray-300 focus:bg-gray-300  focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    disabled={logoutAction.isRunning}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </Modal>
          </nav>
        </div>
        {/* back button */}
        <Link
          class="ml-10 inline-flex items-center gap-x-1 text-lg text-gray-800 hover:cursor-pointer hover:text-primary-600 focus:text-primary-600"
          href={`/page_home_user/${params.accountId}/`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-circle-arrow-left"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12H8" />
            <path d="m12 8-4 4 4 4" />
          </svg>
          Back
        </Link>
        {/* Hi.. */}
        <div class="mx-10 mt-5 w-full space-y-2 text-black">
          <p class="text-3xl font-normal">My Form</p>
          <p class="text-sm text-gray-500">
            You can edit and Change information to be correct
          </p>
        </div>
      </div>
      {/* main div */}
      <div class="container mx-auto px-8">
        {/* form */}
        <div class="flex h-auto w-full flex-col space-y-8 px-10">
          {/* Personal information */}
          <div class=" flex-1 justify-center rounded-3xl bg-gray-50">
            <div class="space-y-4 p-5">
              <h1 class=" text-2xl font-medium text-black">
                Personal Information
              </h1>
              {/* full name */}
              <Field name="userInfo.userInfo.name">
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
                  <Field name="userInfo.userInfo.email">
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
                <Field name="userInfo.userInfo.phone">
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
                      placeholder="xx xxx xxx"
                      type="tel"
                      required
                    />
                  )}
                </Field>
                {/* Date of birth */}
                <Field name="userInfo.userInfo.dayOfBirth">
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
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ].map(({ label, value }) => (
                      <Field key={value} name="userInfo.userInfo.gender">
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
                <Field name="userInfo.userInfo.address">
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
                <Field name="userInfo.userInfo.occupation">
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
                <Field name="userInfo.userInfo.emergencyName">
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
                <Field name="userInfo.userInfo.emergencyPhone">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      label="Phone number"
                      placeholder="xx xxx xxx"
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
                      { label: "Family Book", value: "family_book" },
                      { label: "ID Card", value: "id_card" },
                      { label: "Driver License", value: "driver_license" },
                      { label: "Passport", value: "passport" },
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
          {/* button submit and continue */}
          <div>
            <Button
              block
              variant="solid"
              type="submit"
              isLoading={form.submitting}
            >
              Correct form correction
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
});

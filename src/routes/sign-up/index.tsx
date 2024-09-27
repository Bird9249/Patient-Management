import { component$, useSignal } from "@builder.io/qwik";
import logo_image from "/logo project.png";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Button } from "~/components/button/Button";
import signup_image from "/sign_up_page.jpg";
import { formAction$, useForm, valiForm$, value } from "@modular-forms/qwik";
import { AccountSchema, IAccountSchema } from "./schema/account";
import { addAccount } from "./action/actions";
import { Link } from "@builder.io/qwik-city";

//formAction
export const useRegisterAction = formAction$<
  IAccountSchema,
  { success: boolean; message: string; id?: number }
>(async (values) => {
  try {
    if (values.password !== values.confirmPassword)
      return {
        errors: {
          confirmPassword: "Your password is not matched",
        },
      };

    const result = await addAccount(values);

    return {
      data: {
        success: true,
        message: "",
        id: result,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      data: {
        success: false,
        message: (error as Error).message,
      },
    };
  }
}, valiForm$(AccountSchema));

export default component$(() => {
  const [form, { Field, Form }] = useForm<
    IAccountSchema,
    { success: boolean; message: string; id?: number }
  >({
    loader: {
      value: {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
    },
    validate: valiForm$(AccountSchema),
    action: useRegisterAction(),
  });

  return (
    <Form>
      {/* whole sign in section*/}
      <div class="flex h-screen items-center justify-center overflow-hidden">
        <div class=" grid w-full grid-cols-2 items-center">
          {/* left section: sign in page */}

          <div class="grid-span-1 m-auto w-full max-w-sm ">
            {/* logo tag */}
            <div class="mb-3">
              <img width={84} height={54} src={logo_image} alt="" />
              <span class="ml-1 text-sm font-semibold">SnatBas Clinic</span>
            </div>

            {/* sign in section */}
            <div class="">
              <h1 class="text-2xl">Hi there...</h1>
              <p class="mb-3 text-slate-500">Get started with appointment.</p>

              <div class="space-y-6">
                <Field name="name">
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
                          class="lucide lucide-circle-user"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="10" r="3" />
                          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                        </svg>
                      }
                      value={field.value}
                      error={field.error}
                      label="Full name"
                      type="text"
                      size="small"
                      placeholder="  Valmon Borglum"
                      required
                    />
                  )}
                </Field>

                <Field name="email">
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
                          class="lucide lucide-mail"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      }
                      label="Email address"
                      value={field.value}
                      error={field.error}
                      type="text"
                      size="small"
                      placeholder="  some123@gmail.com"
                      required
                    />
                  )}
                </Field>

                <Field name="phone">
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
                          class="lucide lucide-phone"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      }
                      label="Your phone number (start with 20 or 30)"
                      type="text"
                      size="small"
                      placeholder="  20 xxx xxx xx"
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>

                <Field name="password">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      type="password"
                      label="Enter your password"
                      size="small"
                      placeholder="Enter your password"
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>

                <Field name="confirmPassword">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      type="password"
                      label="Confirm your password"
                      size="small"
                      placeholder="Confirm your password"
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>
                <Button
                  block
                  variant="solid"
                  type="submit"
                  isLoading={form.submitting}
                >
                  Get started
                </Button>
              </div>
            </div>
            {/* bottom link */}
            <div class="mt-7 flex justify-center gap-5">
              <Link
                href="/log_in/"
                class="border-ga-100 border-r pr-2 text-primary-600 underline decoration-primary-600 underline-offset-8 hover:opacity-80 focus:opacity-80 focus:outline-none"
              >
                Log in
              </Link>

              <Link
                href="#"
                class="border-ga-100 border-r pr-2 text-primary-600 underline decoration-primary-600 underline-offset-8 hover:opacity-80 focus:opacity-80 focus:outline-none"
              >
                Contact us
              </Link>
            </div>
          </div>

          {/* right section: image */}

          <div class="grid-span-1">
            <img
              height={832}
              width={691}
              src={signup_image}
              alt=""
              class="h-screen w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Form>
  );
});

import { component$, useSignal } from "@builder.io/qwik";
import logo_image from "./image/logo_SnatBas.jpg";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Button } from "~/components/button/Button";
import login_image from "./image/login_page.jpg";
import { LuUserCircle } from "@qwikest/icons/lucide";
import { formAction$, valiForm$ } from "@modular-forms/qwik";
import { AccountSchema, IAccountSchema } from "./schema/account";
import { addAccount } from "./action/actions";

//formAction
export const useRegisterAction = formAction$<
  IAccountSchema,
  { success: boolean; message: string; id?: number }
>(async (values) => {
  try {
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
  return (
    <>
      {/* whole sign in section*/}
      <div class="flex h-screen items-center justify-center overflow-hidden">
        <div class=" grid w-full grid-cols-2 items-center">
          {/* left section: sign in page */}

          <div class="grid-span-1 m-auto w-full max-w-sm ">
            {/* logo tag */}
            <div class=" mb-5">
              <img class="w-20" src={logo_image} alt="" />
              <span class="text-sm font-semibold">SnatBas Clinic</span>
            </div>

            {/* sign in section */}
            <div class="">
              <h1 class="text-2xl">Hi there...</h1>
              <p class="mb-8 text-slate-500">Get started with appointment.</p>

              <div class="space-y-8">
                <TextInput
                  icon={<LuUserCircle />}
                  value=""
                  label="Full name"
                  type="text"
                  name="fullName"
                  size="small"
                  placeholder="  Valmon Borglum"
                />

                <TextInput
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
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
                  value=""
                  type="text"
                  name="email"
                  size="small"
                  placeholder="  some123@gmail.com"
                />

                <TextInput
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
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
                  label="Your phone number"
                  value=""
                  type="text"
                  name="phoneNumber"
                  size="small"
                  placeholder="  +856 20 xxx xxx xx"
                />
                <TextInput
                  type="password"
                  label="Enter your password"
                  name="password"
                  size="small"
                  placeholder="Enter your password"
                />
                <Button block variant="solid" type="submit">
                  Get started
                </Button>
              </div>
            </div>
            {/* bottom link */}
            <div class="mt-10 flex justify-center gap-5">
              <p>
                <a
                  class="text-blue-600 underline decoration-blue-600 underline-offset-8 hover:opacity-80 focus:opacity-80 focus:outline-none"
                  href="#"
                >
                  Log in
                </a>
              </p>
              <p>
                <a
                  class="text-blue-600 underline decoration-blue-600 underline-offset-8 hover:opacity-80 focus:opacity-80 focus:outline-none"
                  href="#"
                >
                  Contact us
                </a>
              </p>
            </div>
          </div>

          {/* right section: image */}

          <div class="grid-span-1">
            <img
              src={login_image}
              alt=""
              class="h-screen w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
});

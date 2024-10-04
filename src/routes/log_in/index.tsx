/* eslint-disable qwik/no-use-visible-task */
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import { compareSync } from "bcrypt-ts";
import { SignJWT } from "jose";
import { Button } from "~/components/button/Button";
import { TextInput } from "~/components/forms/text-input/TextInput";
import logo_img from "../../../public/logo project.png";
import background_img from "../../../public/picture prompt.png";
import { checkAccount } from "./Action/action";
import type { ILoginSchema } from "./schemas/login.schema";
import { LoginSchema } from "./schemas/login.schema";

export const useLoginAction = formAction$<
  ILoginSchema,
  { success: boolean; message: string; id?: number }
>(async (values, { cookie }) => {
  try {
    const res = await checkAccount(values);

    if (!res)
      return {
        errors: {
          phone: "not found",
        },
      };

    const isPasswordMatch = compareSync(values.password, res.password!);

    if (!isPasswordMatch)
      return {
        errors: {
          password: "password not match",
        },
      };

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

    const token = await new SignJWT({
      sub: String(res.id),
      phone: res.phone,
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("1y")
      .sign(secret);

    cookie.set("auth-token", token, { path: "/", httpOnly: true });

    return {
      data: {
        success: true,
        message: "Login Successfully",
        id: res.id,
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
}, valiForm$(LoginSchema));

export default component$(() => {
  const action = useLoginAction();
  const nav = useNavigate();

  const [form, { Field, Form }] = useForm<
    ILoginSchema,
    { success: boolean; message: string }
  >({
    loader: {
      value: {
        password: "",
        phone: "",
      },
    },
    validate: valiForm$(LoginSchema),
    action,
  });

  useVisibleTask$(async ({ track }) => {
    track(() => action.value?.response.data?.success);

    if (action.value) {
      if (action.value.response.data?.success) {
        await nav(`/page_home_user/${action.value.response.data.id}/`);
      } else {
        alert("Something was wrong!");
      }
    }
  });

  return (
    <Form>
      {/* main div */}
      <div class="flex h-screen w-screen flex-row ">
        {/* form */}
        <div class="flex-1">
          {/* logo */}
          <div class="absolute ml-[110px] mt-[54px] h-[80px] w-[120px]">
            <img src={logo_img} alt="logo_icon" width={84} height={54} />
            <h1 class="ml-1 font-semibold">SnatBas Clinic</h1>
          </div>

          {/* text */}
          <div class="mx-[120px] mt-[172px] ">
            <div>
              <p class="text-2xl ">Welcome back, ...</p>
              <p class="text-base text-gray-500">We can provide advice.</p>
            </div>
            <br />

            {/* input number */}
            <div class="space-y-8">
              <Field name="phone">
                {(field, props) => (
                  <TextInput
                    {...props}
                    value={field.value}
                    error={field.error}
                    label="Your phone number"
                    placeholder="+856 20 xx xxx xxx"
                    type="tel"
                    required
                  />
                )}
              </Field>

              {/* password */}
              <Field name="password">
                {(field, props) => (
                  <TextInput
                    {...props}
                    value={field.value}
                    error={field.error}
                    label="Enter your password"
                    placeholder="Enter your password"
                    type="password"
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
                Log in
              </Button>
            </div>
          </div>

          {/* link page */}
          <div class="mt-40 flex justify-center  ">
            <Link
              href="/sign-up/"
              class="border-ga-200 border-r pr-2 text-primary-600 underline decoration-primary-600 underline-offset-8 hover:opacity-80 focus:opacity-80 focus:outline-none"
            >
              Sign up
            </Link>
            <Link
              href="/stuff"
              class="pl-2 text-primary-600 underline decoration-primary-600 underline-offset-8 hover:opacity-80 focus:opacity-80 focus:outline-none "
            >
              Staff
            </Link>
          </div>
        </div>

        {/* image */}
        <div class="flex-1 ">
          <img
            src={background_img}
            alt="background"
            width={1000}
            height={100}
            class="h-screen w-full object-cover"
          />
        </div>
      </div>
    </Form>
  );
});

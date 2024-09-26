import { component$ } from "@builder.io/qwik";
import logo_img from "../../../public/logo project.png";
import background_img from "../../../public/picture prompt.png";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Button } from "~/components/button/Button";
import { Link } from "@builder.io/qwik-city";
import {AccountSchema, IAccountSchema} from  "../sign-up/schema/account";
import { useForm, valiForm$ } from "@modular-forms/qwik";



export default component$(()=>{

    const[from,{ Field,Form}]= useForm<IAccountSchema>({
        loader: {
            value:{
                name: "",
                email:"",
                password:"",
                phone:"",
            }
        },
        validate: valiForm$(AccountSchema),
    });

   return(
    <Form
       onSubmit$={async(values) =>{
        // await
       } }
    >

    {/* main div */}
    <div class="w-screen h-screen flex flex-row ">

        {/* form */}
        <div class="flex-1">

            {/* logo */}
            <div class="w-[120px] h-[80px] ml-[110px] mt-[54px] absolute">
                <img src={logo_img} alt="logo_icon" width={84} height={54}/>
                <h1 class="ml-1 font-semibold">SnatBas Clinic</h1>
            </div>

            {/* text */}
            <div class="mx-[120px] mt-[172px] ">
                <div>
                <p class="text-2xl ">Welcome back, ...</p>
                <p class="text-base text-gray-500">
                 We can provide advice.
                </p>
                </div>
                <br />

            {/* input number */}
            <div class="space-y-8">
            <Field name ="phone">
                {(field,props) => (
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
            <Field name ="password">
                {(field,props) => (
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
            

            <Button block variant="solid" type="submit">
                  Log in
            </Button>

            </div>
            </div>

              {/* link page */}
              <div class="flex justify-center mt-40  ">
                <Link href="/sign-up/" class="text-primary-600 underline underline-offset-8 decoration-primary-600 hover:opacity-80 focus:outline-none focus:opacity-80 pr-2 border-r border-ga-200" >Sign up</Link>
                <Link href="/stuff" class="text-primary-600 underline underline-offset-8 decoration-primary-600 hover:opacity-80 pl-2 focus:outline-none focus:opacity-80 " >Staff</Link>
            </div>
        </div>

        {/* image */}
        <div class="flex-1 ">
            <img src={background_img} alt="background" width={1000} height={100}
            class="object-cover w-full h-screen"/>
        </div>
    </div>
    </Form>
   ) 
});
import { component$ } from "@builder.io/qwik";
import logo_img from "./img/logo project.png";
import background_img from "./img/picture prompt.png";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Button } from "~/components/button/Button";

export default component$(()=>{
   return(
    <>

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

            {/* input */}
            <div class="space-y-8">
            <TextInput
                  label="Your phone number"
                  placeholder="+856 20 xx xxx xxx"
                  type="tel"
                  required
                />
             <TextInput
                  label="Enter your password"
                  placeholder="Enter your password"
                  type="text"
                  required
                /> 

            <Button block variant="solid" type="submit">
                  Log in
            </Button>

            {/* link page */}
            <div class="flex justify-center ">
                <a class="text-primary-600 underline underline-offset-8 decoration-primary-600 hover:opacity-80 focus:outline-none focus:opacity-80 pr-2 border-r border-ga-200" href="#">Sign up</a>
                <a class="text-primary-600 underline underline-offset-8 decoration-primary-600 hover:opacity-80 pl-2 focus:outline-none focus:opacity-80 " href="#">Staff</a>
            </div>
            
            </div>
            </div>
        </div>

        {/* image */}
        <div class="flex-1 ">
            <img src={background_img} alt="background" width={1000} height={100}
            class="object-cover w-full h-screen"/>
        </div>
    </div>
    </>
   ) 
});
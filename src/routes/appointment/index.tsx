import { component$, qrlDEV } from '@builder.io/qwik';
import { Button } from '~/components/button/Button';
import { AdvancedSelect, SelectOption } from '~/components/forms/advanced-select/AdvancedSelect';
import { TextInput } from '~/components/forms/text-input/TextInput';
import { Textarea } from '~/components/forms/textarea/Textarea';
import logo_page from '/public/logo project.png';
import backgroundpage from '/public/background (1).jpg';
import { Form, routeLoader$ } from '@builder.io/qwik-city';
import { db } from '~/lib/db/db';
import { ImageProps } from '@unpic/qwik';
import {AppointmentSchema, IAppointmentSchema } from './schema/appointment'
import { appointment } from '~/lib/db/schema';
import { setValue, useForm, valiForm$ } from '@modular-forms/qwik';

export const useDoctorLoader = routeLoader$(async () => {
    return await db.query.doctor.findMany({
        columns: {
         id: true,
         name: true,
         image: true,   
        }
    })

})

export default component$(() => {
const loader = useDoctorLoader();

const [form, {Field, Form}] = useForm<IAppointmentSchema>({
    loader : {value: {
            reasonOfAppointment: "",
            dateTime: "",
            doctorId: 0,
            status: "PENDING",
            comment: "", 
    }},
    validate: valiForm$(AppointmentSchema)
});
console.log(loader.value);

    return (
        <Form
        onSubmit$={async (values) =>{
// await
        }}>
<div class="bg-white min-h-screen flex flex-col justify-center relative">
            <img class="absolute w-screen h-screen brightness-110" src={backgroundpage} alt="" />
           <div class="z-10">
                    <div class="ml-28 mb-12">
                        <img class="w-20" src={logo_page} />
                        <span class="text-sm ml-1 font-semibold">SnatBas Clinic</span>
                    </div>
                <div class="ml-32">
                        <h1 class="text-3xl mb-4">Hey There 👋</h1>
                        <p class="mb-6">Request a new appointment in 10 seconds</p>
                    <div class="bg-gray-50 rounded-lg p-8 w-full max-w-screen-lg text-black">
                        <div class="mb-4">
                            {/* Dropdown */}
                            <Field name="doctorId" type='number'>
                                {(field, props) =>(
                                    <AdvancedSelect
                                        name={props.name}
                                        options={loader.value.map(({id, name, image})=> ({
                                            label: name,
                                            value: id,
                                            img: import.meta.env.PUBLIC_IMAGE_URL + "/" + image,
                                        }),)}
                                        onSelected$={(val) => {
                                            setValue(form, "doctorId", val as number);
                                        }}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="Select your doctor"
                                        required
                                        label="Doctor"
                                    />)}
                            
                            </Field>
                            
                            <br />
                            {/* textarea */}
                            <div class="flex flex-row space-x-6">
                                <div class="flex-1">
                                    <Field name= 'reasonOfAppointment'>
                                        {(field, props) => (
                                            <Textarea
                                                {...props}
                                                value={field.value}
                                                error={field.error}
                            
                                                label="Reason for appointment"
                                                placeholder="ex: Annual monthly check-up"
                                                size='large'
                                            />
                                        )}
                                    </Field> 
                                </div>

                                <div class="flex-1">
                                    <Field name="comment">
                                        {(field, props) => (
                                            <Textarea
                                                {...props}
                                                value={field.value}
                                                error={field.error}

                                                label="Additional comments/notes"
                                                placeholder="ex: Prefer afternoon appointments, if possible"
                                                size='large'
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <br />

                            <Field name="dateTime">
                                {(field, props) => (
                                    <TextInput
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        
                                        label="Expected appointment date"
                                        type="datetime-local"
                                    />
                                )}
                            </Field>
                            <br />

                            <Button 
                                block
                                variant="solid" 
                                type="submit"
                                >
                                Submit and continue
                            </Button>
                        </div>
                    </div>
                </div>    
           </div>
        </div>
        </Form>
    )
});
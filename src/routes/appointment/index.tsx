import { component$ } from '@builder.io/qwik';
import { Button } from '~/components/button/Button';
import { AdvancedSelect, SelectOption } from '~/components/forms/advanced-select/AdvancedSelect';
import { TextInput } from '~/components/forms/text-input/TextInput';
import { Textarea } from '~/components/forms/textarea/Textarea';
import logo_page from '/public/logo project.png';
import backgroundpage from '/public/background (1).jpg';

export default component$(() => {
    return (
        <div class="bg-white min-h-screen flex flex-col justify-center relative">
            <img class="absolute w-screen h-screen brightness-110" src={backgroundpage} alt="" />
           <div class="z-10">
                    <div class="ml-28 mb-12">
                        <img class="w-20" src={logo_page} />
                        <span class="text-sm ml-1">SnatBas Clinic</span>
                    </div>
                <div class="ml-32">
                        <h1 class="text-3xl mb-4">Hey There 👋</h1>
                        <p class="mb-6">Request a new appointment in 10 seconds</p>
                    <div class="bg-gray-50 rounded-lg p-8 w-full max-w-screen-lg text-black">
                        <div class="mb-4">
                            {/* Dropdown */}
                            <AdvancedSelect
                                name="doctor"
                                placeholder="Select your doctor"
                                required
                                label="Doctor"
                            />
                            <br />
                            {/* textarea */}
                            <div class="flex flex-row space-x-6">
                                <div class="flex-1">
                                    <Textarea
                                        name="reason"
                                        label="Reason for appointment"
                                        placeholder="ex: Annual monthly check-up"
                                        size='large'
                                    />
                                </div>

                                <div class="flex-1">
                                    <Textarea
                                        name="comments"
                                        label="Additional comments/notes"
                                        placeholder="ex: Prefer afternoon appointments, if possible"
                                        size='large'
                                    />
                                </div>
                            </div>
                            <br />
                            <TextInput
                                label="Expected appointment date"
                                type="datetime-local"
                            />
                            <br />

                            <Button 
                                block
                                variant="solid" 
                                type="button"
                                >
                                Submit and continue
                            </Button>
                        </div>
                    </div>
                </div>    
           </div>
        </div>
    )
});
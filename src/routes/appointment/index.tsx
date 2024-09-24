import { component$ } from '@builder.io/qwik';
import { LuSearch } from '@qwikest/icons/lucide';
import { Button } from '~/components/button/Button';
import { AdvancedSelect, SelectOption } from '~/components/forms/advanced-select/AdvancedSelect';
import { Select } from '~/components/forms/select/Select';
import { TextInput } from '~/components/forms/text-input/TextInput';
import { Textarea } from '~/components/forms/textarea/Textarea';
import logo_page from './img/logo project 1.jpg';
import backgroundpage from './img/background.jpg';

export default component$(() => {
    return (
        <div class="bg-white min-h-screen flex flex-col justify-center relative">
            <img class="absolute w-screen h-screen brightness-110" src={backgroundpage} alt="" />
           <div class="z-10">
                <div class="ml-20">
                    <div class="mb-12">
                        <img class="w-20" src={logo_page} />
                        <span class="text-xl">SnatBas Clinic</span>
                    </div>
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
                                    />
                                </div>

                                <div class="flex-1">
                                    <Textarea
                                        name="comments"
                                        label="Additional comments/notes"
                                        placeholder="ex: Prefer afternoon appointments, if possible"
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
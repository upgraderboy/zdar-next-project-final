"use client"
import {
    useMemo,

} from "react"
import {
    toast
} from "sonner"
import {
    Controller,
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import {
    Input
} from "@/components/ui/input"
import LocationSelector from "@/components/ui/location-input"
import { PhoneInput } from "@/components/ui/phone-input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Textarea
} from "@/components/ui/textarea"
import { trpc } from "@/trpc/client"
import { companySchema } from "@/db/schema"
import { LocationPicker } from "@/modules/resumes/ui/LocationPicker"
import Link from "next/link"
import ImageUpload from "@/components/image-upload"


interface FormSectionProps {
    profile: z.infer<typeof companySchema> | undefined;
    isPending: boolean;
}
import { useRouter } from "next/navigation";
export default function ProfileForm({ profile, isPending }: FormSectionProps) {
    const router = useRouter();
    const { mutate } = trpc.companies.updateProfile.useMutation({
        onSuccess: () => {
            router.refresh();
            toast("Profile Updated!")
        },
        onError: () => {
            toast("Failed to update profile!")
        }
    });



    // Transform profile data to match companySchema
    const defaultValues = useMemo(() => {
        if (!profile) {
            return {
                email: "",
                firstName: "",
                lastName: "",
                companyName: "",
                phoneNumber: "",
                websiteUrl: "",
                gender: "",
                presentation: "",
                countryName: "",
                stateName: "",
                logoUrl: "", // Ensure logoUrl is included
                lat: 0,
                lng: 0,
            };
        }

        return {
            email: profile.email ?? "",
            firstName: profile.firstName ?? "",
            lastName: profile.lastName ?? "",
            companyName: profile.companyName ?? "",
            phoneNumber: profile.phoneNumber ?? "",
            websiteUrl: profile.websiteUrl ?? "",
            gender: profile.gender ?? "",
            presentation: profile.presentation ?? "",
            countryName: profile.countryName ?? "",
            stateName: profile.stateName ?? "",
            logoUrl: profile.logoUrl ?? null, // Handle logoUrl
            lat: profile.lat ?? 0,
            lng: profile.lng ?? 0,
        };
    }, [profile]);
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => mutate(values))} className="space-y-8 max-w-3xl mx-auto py-10">
            <FormField control={form.control} name="logoUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logo</FormLabel>
                                <ImageUpload value={field.value ? [field.value] : []} onChange={(url) => field.onChange(url)} onRemove={() => field.onChange('')} />
                                <FormMessage />
                            </FormItem>
                        )} />

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="websiteUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your website link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://company.com"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>Enter Your Company Website Url</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Company Name"

                                            type=""
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>Enter Your Company Name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>
                <Controller
                    name="lat"
                    control={form.control}
                    render={({ field: latField }) => (
                        <Controller
                            name="lng"
                            control={form.control}
                            render={({ field: lngField }) => (
                                <LocationPicker
                                    className="w-full"
                                    apiKey={process.env.GOOGLE_MAPS_API_KEY! || "AIzaSyCRh0XosbCfHfG6-VJMpnbfE7gy2VYE91o"}
                                    value={
                                        latField.value !== undefined && lngField.value !== undefined
                                            ? { lat: latField.value, lng: lngField.value }
                                            : undefined
                                    }
                                    defaultValue={profile?.lat && profile?.lng ? { lat: profile.lat, lng: profile.lng } : undefined}
                                    onValueChange={(value) => {
                                        latField.onChange(value?.lat);
                                        lngField.onChange(value?.lng);
                                    }}
                                />
                            )}
                        />
                    )}
                />
                <FormField control={form.control} name="sectorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sector Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your sector name"

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>Enter Your Sector Name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                <FormField
                    control={form.control}
                    name="countryName" // <- this is required to get FormField working
                    render={() => (
                        <FormItem>
                            <FormLabel>Select Country & State</FormLabel>
                            <FormControl>
                                <LocationSelector
                                    onCountryChange={(country) => {
                                        form.setValue('countryName', country?.name || '')
                                    }}
                                    onStateChange={(state) => {
                                        form.setValue('stateName', state?.name || '')
                                    }}
                                    initialCountryName={form.watch('countryName')}
                                    initialStateName={form.watch('stateName')}
                                />
                            </FormControl>
                            <FormDescription>
                                If your country has states, it will appear after selecting country.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl className="w-full">
                                        <PhoneInput
                                            placeholder="Enter your phone number"
                                            {...field}
                                            defaultCountry="TR"
                                        />
                                    </FormControl>
                                    <FormDescription>Enter your phone number.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"

                                            type="email"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>Enter Your Email</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="MR / MRS" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="MALE">Male</SelectItem>
                                            <SelectItem value="FEMALE">Female</SelectItem>
                                            <SelectItem value="Rather Not Say">Rather Not Say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Select your gender</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your first name"

                                            type=""
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>Enter Your First Name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your last name"

                                            type=""
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>Enter Your Last Name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <FormField
                    control={form.control}
                    name="presentation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company&apos;s Presentation</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your company's presentation"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Write Company&apos;s Presentation</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-2">
                <Button variant={"ghost"} asChild><Link href={`/companies/${profile?.id}`}>View Profile</Link></Button>
                    <Button type="submit" disabled={isPending}>Submit</Button>
                </div>
            </form>
        </Form>
    )
}
'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SettingsFormType, settingsSchema } from "@/types/settings-schema";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FormInfo } from "@/components/auth/form-info";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { settings } from "@/server/actions/settings";

type SettingsCardProps = {
    session: Session
}


export default function SettingsCard({
    session
}: SettingsCardProps) {

    const form = useForm<SettingsFormType>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            email: session.user?.email || undefined,
            image: session.user?.image || undefined,
            name: session.user?.name || undefined,
            newPassword: undefined,
            password: undefined
        }
    });

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [avatarUploading, setAvatarUploading] = useState<boolean>(false);

    const { handleSubmit, control } = form;

    const { execute, status } = useAction(settings, {
        onSuccess: (data) => {
            if (data?.data?.error) setError(data?.data?.error);
            if (data?.data?.success) setSuccess(data?.data?.success);
        }
    });

    const onSubmit = (data: SettingsFormType) => {
        execute(data);

    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Your settings</CardTitle>
                <CardDescription>Update your account settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Name"
                                            type="text"
                                            disabled={status === "executing"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            disabled={status === "executing"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                    <div className="flex items-center gap-4">
                                        {
                                            !form.getValues('image')
                                            && <div className="font-bold">
                                                {
                                                    session.user?.name?.charAt(0).toUpperCase()
                                                }
                                            </div>
                                        }
                                        {
                                            form.getValues('image') && <Image
                                                className="rounded-full"
                                                src={form.getValues('image')!}
                                                alt={form.getValues('name')!}
                                                width={42}
                                                height={42}
                                            />
                                        }

                                    </div>
                                    <FormControl>
                                        <Input
                                            placeholder="Image"
                                            disabled={status === "executing"}
                                            type="hidden"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            disabled={status === "executing" || session.user.isOAuth}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="New Password"
                                            type="password"
                                            disabled={status === "executing" || session.user.isOAuth}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormInfo message={success || error} isError={!!error} />
                        <Button
                            type="submit"
                            disabled={status === 'executing' || avatarUploading}
                            className="mt-2"
                        >
                            Apply
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )

}
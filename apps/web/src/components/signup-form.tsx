"use client";

import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { REGISTER_MUTATION } from "~/lib/graphql/mutations";
import { cn } from "~/lib/utils";

const signupSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(30, "Username must be less than 20 characters"),
	email: z.string().email("Please enter a valid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(100, "Password must be less than 100 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION, {
		onCompleted: () => {
			// Show success message and redirect
			form.reset();
			setTimeout(() => {
				router.push("/login?message=Registration successful! Please log in.");
			}, 1000);
		},
		onError: (error) => {
			form.setError("root", {
				message: error.message || "Registration failed. Please try again.",
			});
		},
	});

	const onSubmit = async (values: SignupFormValues) => {
		try {
			await registerMutation({
				variables: {
					username: values.username,
					email: values.email,
					password: values.password,
				},
			});
		} catch (err) {
			// Error handling is done in onError callback
		}
	};

	// Show success state
	if (form.formState.isSubmitSuccessful && !form.formState.errors.root) {
		return (
			<div className={cn("flex flex-col gap-6", className)} {...props}>
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Registration Successful!</CardTitle>
						<CardDescription className="text-green-600">
							Your account has been created. Redirecting to login page...
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create an account</CardTitle>
					{form.formState.errors.root && (
						<CardDescription className="text-red-500">
							{form.formState.errors.root.message}
						</CardDescription>
					)}
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
							<div className="grid gap-6">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input type="text" placeholder="johndoe" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="m@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="Minimum 6 characters"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? "Creating account..." : "Sign up"}
								</Button>
							</div>
							<div className="text-center text-sm">
								Already have an account?{" "}
								<a href="/login" className="underline underline-offset-4">
									Login
								</a>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-muted-foreground text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}

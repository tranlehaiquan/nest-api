"use client";

import { useLazyQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
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
import { useAuth } from "~/lib/auth/auth-context";
import { LOGIN_MUTATION } from "~/lib/graphql/mutations";
import { cn } from "~/lib/utils";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { login } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const successMessage = searchParams.get("message");

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [loginMutation, { loading }] = useLazyQuery(LOGIN_MUTATION, {
		onCompleted: async (data) => {
			const { login: loginData } = data;
			// Extract token and user data
			const { token, ...userData } = loginData;
			await login(userData, token);
			router.push("/"); // Redirect to home page after successful login
		},
		onError: (error) => {
			form.setError("root", {
				message: error.message || "Login failed. Please try again.",
			});
		},
	});

	const onSubmit = async (values: LoginFormValues) => {
		try {
			await loginMutation({
				variables: { email: values.email, password: values.password },
			});
		} catch (err) {
			// Error handling is done in onError callback
		}
	};

	// Clear success message after 5 seconds
	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				router.replace("/login");
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [successMessage, router]);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					{successMessage && (
						<CardDescription className="text-green-600">
							{successMessage}
						</CardDescription>
					)}
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
											<div className="flex items-center">
												<FormLabel>Password</FormLabel>
												<a
													href="#"
													className="ml-auto text-sm underline-offset-4 hover:underline"
												>
													Forgot your password?
												</a>
											</div>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? "Logging in..." : "Login"}
								</Button>
							</div>
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<a href="/signup" className="underline underline-offset-4">
									Sign up
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

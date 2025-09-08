import {
	Button,
	Container,
	Head,
	Html,
	Img,
	Text,
} from "@react-email/components";

type Props = {
	to: {
		email: string;
	};
	callbackUrl: string;
};

export function VerifyEmail({ to, callbackUrl }: Props) {
	return (
		<Html>
			<Head>
				<title>Magic Link</title>
			</Head>
			<Container
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "16px",
					padding: "32px",
				}}
			>
				<Text style={{ fontSize: "20px", fontWeight: "bold" }}>
					Sign in to your account
				</Text>
				<Text style={{ fontSize: "16px" }}>
					Please use the following link to sign in to your account:
				</Text>
				<Button
					href={callbackUrl}
					style={{
						background: "#000",
						color: "#fff",
						padding: "8px 16px",
						fontSize: "14px",
						fontWeight: "bolder",
					}}
				>
					Sign in
				</Button>
				<Text style={{ fontSize: "13px", color: "#666" }}>
					Link not working? Copy and paste the following into your browser:{" "}
					{callbackUrl}
				</Text>
			</Container>
		</Html>
	);
}

export default function Example() {
	return (
		<VerifyEmail
			to={{ email: "test@test.com" }}
			callbackUrl="https://www.buildhype.dev/api/verify?code=123456&id=123456"
		/>
	);
}

import { Button, Container, Head, Html, Text } from "@react-email/components";

type Props = {
	org: {
		name: string;
	};
	callbackUrl: string;
};

export function InviteEmail({ callbackUrl, org }: Props) {
	return (
		<Html>
			<Head>
				<title>You're invited to join {org.name}</title>
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
					You're invited to join {org.name}
				</Text>
				<Text style={{ fontSize: "16px" }}>
					Please use the following link to join {org.name}:
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
					Accept Invitation
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
		<InviteEmail
			callbackUrl="https://www.buildhype.dev/api/verify?code=123456&id=123456"
			org={{ name: "Test Org" }}
		/>
	);
}

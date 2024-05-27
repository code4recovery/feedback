import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const Email = ({
  buttonLink,
  buttonText,
  footer,
  headline,
  instructions,
  subject,
}: {
  buttonLink: string;
  buttonText: string;
  footer?: string;
  headline: string;
  instructions: string;
  subject: string;
}) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>{headline}</Preview>
        <Body className="bg-neutral-100 font-sans mx-auto my-auto py-4 text-center">
          <Container className="bg-white border border-neutral-200 rounded p-5">
            <Heading className="text-neutral-800 text-xl font-bold text-center p-0 my-3 mx-0">
              {subject}
            </Heading>
            <Text className="text-neutral-800 text-base">{headline}</Text>
            <Text className="text-neutral-800 text-base">{instructions}</Text>
            <Section className="text-center mt-5 mb-3">
              <Button
                className="rounded text-white font-semibold no-underline text-center text-base px-6 py-3 bg-blue-600 hover:bg-blue-700"
                href={buttonLink}
              >
                {buttonText}
              </Button>
            </Section>
          </Container>
          {footer && (
            <Container className="px-5">
              <Text className="text-neutral-500 text-sm">{footer}</Text>
            </Container>
          )}
        </Body>
      </Html>
    </Tailwind>
  );
};

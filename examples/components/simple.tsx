import {
    Bold,
    expectRichMessage,
    Heading,
    Paragraph,
    RichMessage,
} from "../../src/components.ts";

// The components interface is the same builders exposed as JSX. `expectRichMessage`
// narrows the root element to a rich-message value at runtime.
export const simple = expectRichMessage(
    <RichMessage>
        <Heading size={1}>Welcome</Heading>
        <Paragraph>
            Hello from <Bold>grammy-rich-messages</Bold>.
        </Paragraph>
    </RichMessage>,
);

export const simpleJson = JSON.stringify(simple);

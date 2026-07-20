import type { InputRichMessage, Message } from "grammy/types"
import type { JSX } from "./components/jsx-runtime"
import type { Context, NextFunction } from "grammy"
import { expectRichMessage } from "./components"
import { RichMessage } from "./fluent"

export type RichMessagesFlavor<C = Context> = C & {
    replyRich(richMessage: InputRichMessage | JSX.Element): Promise<Message.RichMessageMessage>
}

export const richMessages = async (ctx: RichMessagesFlavor, next: NextFunction) => {
    Object.defineProperty(ctx, 'replyRich', {
        writable: false,
        configurable: false,
        value: (input: InputRichMessage | JSX.Element) => {
            if (input instanceof RichMessage) {
                return ctx.replyWithRichMessage(input)
            }
            ctx.replyWithRichMessage(expectRichMessage(input))
        }
    })
    await next()
}
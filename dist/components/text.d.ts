import type { ChildrenProps, NoChildrenProps } from "./shared.js";
export declare function Bold({ children }: ChildrenProps): {
    readonly kind: "bold";
    readonly props: ChildrenProps;
};
export declare function Italic({ children }: ChildrenProps): {
    readonly kind: "italic";
    readonly props: ChildrenProps;
};
export declare function Underline({ children }: ChildrenProps): {
    readonly kind: "underline";
    readonly props: ChildrenProps;
};
export declare function Strikethrough({ children }: ChildrenProps): {
    readonly kind: "strikethrough";
    readonly props: ChildrenProps;
};
export declare function Spoiler({ children }: ChildrenProps): {
    readonly kind: "spoiler";
    readonly props: ChildrenProps;
};
export declare function Subscript({ children }: ChildrenProps): {
    readonly kind: "subscript";
    readonly props: ChildrenProps;
};
export declare function Superscript({ children }: ChildrenProps): {
    readonly kind: "superscript";
    readonly props: ChildrenProps;
};
export declare function Marked({ children }: ChildrenProps): {
    readonly kind: "marked";
    readonly props: ChildrenProps;
};
export declare function Code({ children }: ChildrenProps): {
    readonly kind: "code";
    readonly props: ChildrenProps;
};
export declare function DateTime({ children, ...options }: ChildrenProps & {
    unixTime: number;
    format: string;
}): {
    readonly kind: "date_time";
    readonly props: ChildrenProps & {
        unixTime: number;
        format: string;
    };
};
export declare function TextMention({ children, ...options }: ChildrenProps & {
    user: Record<string, unknown>;
}): {
    readonly kind: "text_mention";
    readonly props: ChildrenProps & {
        user: Record<string, unknown>;
    };
};
export declare function CustomEmoji({ children, ...options }: {
    id: string;
    alt: string;
} & NoChildrenProps): {
    readonly kind: "custom_emoji";
    readonly props: {
        id: string;
        alt: string;
    } & NoChildrenProps;
};
export declare function InlineMath({ children, ...options }: {
    expression: string;
} & NoChildrenProps): {
    readonly kind: "mathematical_expression";
    readonly props: {
        expression: string;
    } & NoChildrenProps;
};
export declare function Link({ children, ...options }: ChildrenProps & {
    url: string;
}): {
    readonly kind: "url";
    readonly props: ChildrenProps & {
        url: string;
    };
};
export declare function Email({ children, ...options }: ChildrenProps & {
    address: string;
}): {
    readonly kind: "email_address";
    readonly props: ChildrenProps & {
        address: string;
    };
};
export declare function Phone({ children, ...options }: ChildrenProps & {
    number: string;
}): {
    readonly kind: "phone_number";
    readonly props: ChildrenProps & {
        number: string;
    };
};
export declare function BankCard({ children, ...options }: ChildrenProps & {
    number: string;
}): {
    readonly kind: "bank_card_number";
    readonly props: ChildrenProps & {
        number: string;
    };
};
export declare function Mention({ children, ...options }: ChildrenProps & {
    username: string;
}): {
    readonly kind: "mention";
    readonly props: ChildrenProps & {
        username: string;
    };
};
export declare function Hashtag({ children, ...options }: ChildrenProps & {
    value: string;
}): {
    readonly kind: "hashtag";
    readonly props: ChildrenProps & {
        value: string;
    };
};
export declare function Cashtag({ children, ...options }: ChildrenProps & {
    value: string;
}): {
    readonly kind: "cashtag";
    readonly props: ChildrenProps & {
        value: string;
    };
};
export declare function BotCommand({ children, ...options }: ChildrenProps & {
    command: string;
}): {
    readonly kind: "bot_command";
    readonly props: ChildrenProps & {
        command: string;
    };
};
export declare function TextAnchor({ children, ...options }: {
    name: string;
} & NoChildrenProps): {
    readonly kind: "anchor";
    readonly props: {
        name: string;
    } & NoChildrenProps;
};
export declare function AnchorLink({ children, ...options }: ChildrenProps & {
    name: string;
}): {
    readonly kind: "anchor_link";
    readonly props: ChildrenProps & {
        name: string;
    };
};
export declare function Reference({ children, ...options }: ChildrenProps & {
    name: string;
}): {
    readonly kind: "reference";
    readonly props: ChildrenProps & {
        name: string;
    };
};
export declare function ReferenceLink({ children, ...options }: ChildrenProps & {
    name: string;
}): {
    readonly kind: "reference_link";
    readonly props: ChildrenProps & {
        name: string;
    };
};
//# sourceMappingURL=text.d.ts.map
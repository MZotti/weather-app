import React from "react";

import {PresenceTransition} from "native-base";

interface Props {
    isVisible: boolean,
    duration?: number,
    children: JSX.Element
}

const FadeOpacity = ({isVisible, duration = 0, children}: Props) => (
    <PresenceTransition
        visible={isVisible || true}
        initial={{
            opacity: 0,
            scale: 0.8
        }}
        animate={{
            opacity: 1,
            scale: 1,
            transition: {
                duration: 200 + (duration * 260)
            }
        }}
    >
        {children}
    </PresenceTransition>
)

export default FadeOpacity
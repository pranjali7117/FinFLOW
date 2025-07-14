import * as React from "react"
import { cn } from "../../lib/utils"

const Slot = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(className)}
            {...props}
        />
    )
})
Slot.displayName = "Slot"

export { Slot } 
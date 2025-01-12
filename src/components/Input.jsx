import { forwardRef } from "react";

export const Input = forwardRef(function Input({
    label,
    type = "text",
    placeholder,
    ...props
},ref){
    return (
        <label>
            {label && label}
            <input type={type} placeholder={placeholder} {...props} ref={ref} />
        </label>
    )
});
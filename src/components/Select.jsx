import React, { forwardRef, useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
},ref) {

    const id = useId();

  return (
    <div>
        <label htmlFor={id}>{label}</label>
      <select id={id} className={`${className}`} {...props} ref={ref}>
        {
            options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))
        }
      </select>
    </div>
  )
}

export default forwardRef(Select);

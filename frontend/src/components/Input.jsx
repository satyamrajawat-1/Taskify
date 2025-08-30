import React ,{useId , forwardRef} from 'react'

function Input(
    {
        type = "text",
        className = "",
        placeholder="",
        label,
        ...props
    },ref
) {
    const id = useId()
  return (
    <div >
        {label && <label htmlFor={id}>{label}</label>}
    <input type={type} placeholder={placeholder}{...props} id={id} className={`${className} outline-none cursor-pointer`} ref={ref}>
    </input>
    </div>
  )
}

export default forwardRef(Input)
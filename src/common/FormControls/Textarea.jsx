import  React from 'react'

const Textarea = ({input, meta, ...props}) => {
    debugger;
    return (
        <div>
            <textarea {...input}  {...props} />
        </div>
    )
}

export default Textarea;
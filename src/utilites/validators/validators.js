export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

export const maxLengthCreator = (maxLength) => (value) => {
    return (
        value && value.length > maxLength ? `Must be ${maxLength} characters or less` : undefined
    )
}


import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
export const CustomButton = (props) => {
    const {variant,color,name,handler,property,style,disabled} = props
    return (
        <Button
            variant={variant}
            color={color}
            onClick={handler}
            className={property}
            style={style}
            disabled={disabled}
        >
            {name}
        </Button>
    )
}
CustomButton.propTypes = {
    variant: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    property: PropTypes.object,
    style: PropTypes.object,
    disabled: PropTypes.bool
}
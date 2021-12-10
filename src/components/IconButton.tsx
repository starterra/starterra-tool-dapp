import classNames from 'classnames'
import React, { FC } from 'react'

interface IconButtonProps {
  onClick?: () => void
  ariaLabel?: string
  className?: string
  color?: string
  size?: string
}

const IconButton: FC<IconButtonProps> = (props) => {
  const { onClick, className, ariaLabel, size, children } = props
  const btnClass = classNames({
    'icon-button': true,
    'icon-button-small-size': size === 'small'
  })
  return (
    <button
      aria-label={ariaLabel}
      className={`${className} ${btnClass}`}
      onClick={onClick}
    >
      <span className='icon-button-label'>{children}</span>
    </button>
  )
}

export default IconButton

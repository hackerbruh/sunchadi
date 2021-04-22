import React from 'react'

export const H1 = ({ children, style, center }) => <h1 className="heading__h1" style={{ ...style, textAlign: (center ? 'center' : 'left') }}>{children}</h1>
export const H2 = ({ children, style, center }) => <h2 className="heading__h2" style={{ ...style, textAlign: (center ? 'center': 'left')}}>{children}</h2>
export const H3 = ({ children, style, center }) => <h3 className="heading__h3" style={{ ...style, textAlign: (center ? 'center': 'left')}}>{children}</h3>
export const H4 = ({ children, style, center }) => <h4 className="heading__h4" style={{ ...style, textAlign: (center ? 'center': 'left')}}>{children}</h4>
export const H5 = ({ children, style, center }) => <h5 className="heading__h5" style={{ ...style, textAlign: (center ? 'center': 'left')}}>{children}</h5>
export const H6 = ({ children, style, center }) => <h6 className="heading__h6" style={{ ...style, textAlign: (center ? 'center': 'left')}}>{children}</h6>
import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from './ButtonSidebar.module.scss';

const cx = classNames.bind(style)
function ButtonSidebar({ to, href, children, onClick }) {
    let Comp = 'button'
    const props = { onClick };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper');

    return ( 
        <Comp className={classes} {...props}>
            {children}
        </Comp>
     );
}

export default ButtonSidebar;
import React from "react";

function headerMenu({ href, text }) {
    return <li class="list__item"><a class="list__link" href={href}>{text}</a></li>;
}

export default headerMenu;
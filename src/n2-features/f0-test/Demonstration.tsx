import React from 'react';
import SuperInputText from "../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";

export const Demonstration = () => {
    return (
        <div>
            <h1>DEMONSTRATION COMPONENT</h1>
            <SuperInputText placeholder={'input demonstration'}/>
            <SuperCheckbox />
            <SuperButton>button</SuperButton>
        </div>
    );
};
import * as React from 'react';
import DisplayGrid from '../modules/class/display_grid';
import Title from '../modules/class/class_display';

export default function ClassList(props) {
    return (
        <div>
            <Title className={props.className}/>
            <DisplayGrid class={props.classStudents}/>
        </div>
    )
}
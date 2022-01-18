import React from 'react';
import './widgetSm.css';
import {Visibility} from '@material-ui/icons';

export default function WidgetSm() {
    return (
        <div className="widgetSM">
            <span className="widgetSmTitle">Members</span>
            <ul className="widgetSmList">
                <li className="widgetSmListItem">
                    <img src="https://www.w3schools.com/w3images/team2.jpg" alt="imageFromW3Schools" className="widgetSmImage" />
                    <div className="widgetSmUser">
                    <span className="widgetSmUsername">Irfan Shaikh</span>
                    <span className="widgetSmUserTitle">Founder & CEO</span>
                    </div>
                    <button className="widgetSmButton">
                      <Visibility className="widgetSmIcon" />Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="https://www.w3schools.com/w3images/team2.jpg" alt="imageFromW3Schools" className="widgetSmImage" />
                    <div className="widgetSmUser">
                    <span className="widgetSmUsername">Karan unknown</span>
                    <span className="widgetSmUserTitle">Married Graphic Designer</span>
                    </div>
                    <button className="widgetSmButton">
                      <Visibility className="widgetSmIcon" />Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="https://www.w3schools.com/w3images/team2.jpg" alt="imageFromW3Schools" className="widgetSmImage" />
                    <div className="widgetSmUser">
                    <span className="widgetSmUsername">Deependra Vishwakarma</span>
                    <span className="widgetSmUserTitle">Senior Intern</span>
                    </div>
                    <button className="widgetSmButton">
                      <Visibility className="widgetSmIcon" />Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="https://www.w3schools.com/w3images/team2.jpg" alt="imageFromW3Schools" className="widgetSmImage" />
                    <div className="widgetSmUser">
                    <span className="widgetSmUsername">Vijayraj Yadav</span>
                    <span className="widgetSmUserTitle">Graphic Designer</span>
                    </div>
                    <button className="widgetSmButton">
                      <Visibility className="widgetSmIcon" />Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="https://www.w3schools.com/w3images/team2.jpg" alt="imageFromW3Schools" className="widgetSmImage" />
                    <div className="widgetSmUser">
                    <span className="widgetSmUsername">Nitesh yadav</span>
                    <span className="widgetSmUserTitle">Senior Developer</span>
                    </div>
                    <button className="widgetSmButton">
                      <Visibility className="widgetSmIcon" />Display
                    </button>
                </li>
            </ul>
        </div>
    )
}

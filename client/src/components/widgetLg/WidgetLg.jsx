import React from 'react';
import './widgetLg.css';

export default function WidgetLg() {
    
    const Button=({type})=>{
     return <button className={"widgetLgButton "+type}>{type}</button>
    }

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest Transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://www.w3schools.com/w3images/team2.jpg" alt="imageFromW3Schools" className="widgetLgImage"/>
                        <span className="widgetLgName">Deependra Vishwakarma</span>
                    </td>
                    <td className="widgetLgDate">3 June 2021</td>
                    <td className="widgetLgAmount">$122.75</td>
                    <td className="widgetLgStatus"><Button type="Approved" /></td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://www.w3schools.com/w3images/team2.jpg" alt="imageFromW3Schools" className="widgetLgImage"/>
                        <span className="widgetLgName">Deependra Vishwakarma</span>
                    </td>
                    <td className="widgetLgDate">3 June 2021</td>
                    <td className="widgetLgAmount">$122.75</td>
                    <td className="widgetLgStatus"><Button type="Declined" /></td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://www.w3schools.com/w3images/team2.jpg" alt="imageFromW3Schools" className="widgetLgImage"/>
                        <span className="widgetLgName">Deependra Vishwakarma</span>
                    </td>
                    <td className="widgetLgDate">3 June 2021</td>
                    <td className="widgetLgAmount">$122.75</td>
                    <td className="widgetLgStatus"><Button type="Pending" /></td>
                </tr>
            </table>
        </div>
    )
}

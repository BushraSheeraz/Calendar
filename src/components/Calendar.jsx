import React, { Component } from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateContext: moment(),
            today: moment(),
            allMonths: moment.months(),
            showYearPopup: false,
            showMonthPopup: false
        }
    }

    weekDays = moment.weekdaysShort();
    months = moment.months();


    // Functions for Year,Month,Date

    year = () => {
        return this.state.dateContext.format('Y');
    }
    month = () => {
        return this.state.dateContext.format('MMMM');
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        return this.state.dateContext.get('date');
    }
    currentDay = () => {
        return this.state.dateContext.format('D');
    }
    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf("month").format("d");
        return firstDay;
    }


    render() {
        let weekdays = this.weekDays.map((day) => {
            return (
                <td key={day}>{day}</td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td className="blanks">{""}</td>);
        }
        console.log("blanks :", blanks);

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? "current-day" : "day")
            daysInMonth.push(
                <td key={d} className={`calendar Day ${className}`}>
                    {d}
                </td>
            )
        }
        console.log("days :", daysInMonth);


        let totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
                <tr>{d}</tr>
            )
        });
        console.log(trElems);

        //function for All Month List
        

        return (
            <div>
                <h2>Calendar</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan="7">{this.month()}</th>
                        </tr>
                        <tr>{weekdays}</tr>
                    </thead>
                    <tbody>

                        {trElems}
                    </tbody>
                </Table>
                {/* <table>
                    <thead>
                        <tr></tr>
                    </thead>
                    <tbody>
                        <tr>{weekdays}</tr>
                        {trElems}
                    </tbody>
                </table> */}
            </div>
        );
    }
}

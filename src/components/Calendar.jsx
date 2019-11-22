import React, { Component } from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { thisExpression } from '@babel/types';

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

    //functions for All Month List
    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }
    onSelectChange = (e, data) => {
        this.setMonth(data);
    }

    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}}>
                        {data}
                    </a>
                </div>
            );
        });
        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e) => { this.onChangeMonth(e, this.month()) }}>
                {this.month()}
                {this.state.showMonthPopup &&
                    <this.SelectList data={this.months} />
                }
            </span>
        );
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



        return (
            <div>
                <h2>Calendar</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr className="months">
                            <th colSpan="7"><this.MonthNav /></th>
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

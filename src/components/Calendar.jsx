import React, { Component } from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateContext: moment(),
            today: moment(),
            allMonths: moment.months(),
            showYearPopup: false,
            showMonthPopup: false,
            // currentTime: moment(),
        }
    }

    weekDays = moment.weekdaysShort();
    months = moment.months();
    currentYear = moment.year;
    // currentTime = moment.time;


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
    currentTime = () => {
        return this.state.dateContext.format("h:mm:ss a")
    }
    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf("month").format("d");
        return firstDay;
    }


    /* functions for All Month List */
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
                <div key={data} className="abc">
                    <a href="#" onClick={(e) => { this.onSelectChange(e, data) }}>
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
    /* -----------------***************------------------  */

    /*Functions for Year changing */

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }

    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
                <input type="number" placeholder="year"
                    defaultValue={this.year()}
                    ref={(yearInput) => { this.yearInput = yearInput }}
                    onKeyUp={(e) => { this.onKeyUpYear(e) }}
                    onChange={(e) => { this.onYearChange(e) }}></input> :
                <span onDoubleClick={(e) => { this.showYearEditor() }}>
                    {this.year()}
                </span>
        )
    }

    /* -----------------**************-------------------*/

    /* -----Function for changing month on icons click----*/
    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
    }

    // componentDidMount() {
    //     this.currentTime = setInterval((() => {
    //         this.currentTime();
    //     }), 1000);
    // }

    render() {
        // Week Days
        let weekdays = this.weekDays.map((day) => {
            return (
                <td key={day}>{day}</td>
            )
        });

        // Blank spaces in a month
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={blanks} className="blanks">{""}</td>);
        }
        // console.log("blanks :", blanks);

        // days in a month
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? "current-day" : "day")
            daysInMonth.push(
                <td key={d} className={`calendar Day ${className}`}>
                    {d}
                </td>
            )
        }
        // console.log("days :", daysInMonth);
        // console.log(moment().format('h:mm:ss a'));

        /* TotalSlots= total number of blank spaces occupy and total days in a months */
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

        // dates in a month
        let trElems = rows.map((d, i) => {
            return (
                <tr colSpan="2" className="table-elements">{d}</tr>
            )
        });
        // console.log(trElems);


        return (
            <div className="main">
                {/* <h2>Calendar</h2> */}
                <div className="cale">
                    <div className="clock-div">
                        <span className="clock">
                            {moment().format('hh:mm:ss a')}
                        </span>
                        <span className="Date">
                            {moment().format('MMMM Do YYYY')}
                        </span>
                    </div>
                    <div className="Taskbar-div">
                        <div className="taskbar">
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="main-calendar">
                    <Table striped bordered hover>
                        <thead>
                            <tr className="months">
                                <th colSpan="5" className="table-elements">{
                                    <div className="Month-nav">
                                        <FontAwesomeIcon icon={faChevronLeft} onClick={(e) => { this.prevMonth() }} />
                                        <this.MonthNav />
                                        <FontAwesomeIcon icon={faChevronRight} onClick={(e) => { this.nextMonth() }} />
                                    </div>
                                }
                                </th>
                                <th colSpan="2" className="table-elements">{<this.YearNav />}</th>
                            </tr>
                            <tr className="table-elements">{weekdays}</tr>
                        </thead>
                        <tbody>
                            {trElems}
                            <tr></tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

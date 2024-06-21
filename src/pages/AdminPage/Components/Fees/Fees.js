import React, { useState } from "react";

import './styles.css';

const feesData = [
    { rollNo: 1, name: "Tiger Nixon", invoice: "#54605", type: "Library", payment: "Cash", status: "Paid", date: "2011/04/25", amount: "120$" },
    { rollNo: 2, name: "Garrett Winters", invoice: "#54687", type: "Library", payment: "Credit Card", status: "Pending", date: "2011/07/25", amount: "120$" },
    { rollNo: 3, name: "Ashton Cox", invoice: "#35672", type: "Tuition", payment: "Cash", status: "Paid", date: "2009/01/12", amount: "120$" },
    { rollNo: 4, name: "Cedric Kelly", invoice: "#57984", type: "Annual", payment: "Credit Card", status: "Pending", date: "2012/03/29", amount: "120$" },
    { rollNo: 5, name: "Airi Satou", invoice: "#12453", type: "Library", payment: "Cheque", status: "Pending", date: "2008/11/28", amount: "120$" },
    { rollNo: 6, name: "Brielle Williamson", invoice: "#59723", type: "Tuition", payment: "Cash", status: "Paid", date: "2012/12/02", amount: "120$" },
    { rollNo: 7, name: "Herrod Chandler", invoice: "#98726", type: "Tuition", payment: "Credit Card", status: "Unpaid", date: "2012/08/06", amount: "120$" }
];

function Fees() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFees = feesData.filter(fee =>
        fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.payment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            
            <div className="fees-page">
                <h1>Fees Collection</h1>
                <div className="table-container">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Student Name</th>
                                <th>Invoice number</th>
                                <th>Fees Type</th>
                                <th>Payment Type</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFees.map(fee => (
                                <tr key={fee.rollNo}>
                                    <td>{fee.rollNo}</td>
                                    <td>{fee.name}</td>
                                    <td>{fee.invoice}</td>
                                    <td>{fee.type}</td>
                                    <td>{fee.payment}</td>
                                    <td><span className={`status ${fee.status.toLowerCase()}`}>{fee.status}</span></td>
                                    <td>{fee.date}</td>
                                    <td>{fee.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Fees;

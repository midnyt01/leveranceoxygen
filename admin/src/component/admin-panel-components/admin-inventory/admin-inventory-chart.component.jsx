import Chart from 'react-apexcharts'
import React, { Component } from 'react' 
import '../admin-analytics/admin-analytics.css'
import './inventory.css'

class AdminInventoryChart extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        
        series: [44, 55, 13],
        options: {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: ['Small', 'Medium', 'Large'],
            responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 320
                },
                legend: {
                position: 'bottom'
                },
                title: {
                text: 'Top Product Sale',
                align: 'left'
                }
            }
            }]
        },
        
        
        };
    }
    
    render() {
        return (
        <div className='container-fluid m-auto'>
            <div className='sales-chart-container mt-4 mb-3 padding-10'>
            <Chart options={this.state.options} series={this.state.series} type="pie" height={320} />
            </div>
        </div>
        )
    }
}

export default AdminInventoryChart;
// Function to generate a random stock price
function getRandomPrice(basePrice) {
    return parseFloat((basePrice + (Math.random() * 10 - 5)).toFixed(2));
}

// Initial prices for each company
const initialPrices = {
    Apple: 231.41,
    Microsoft: 428.15,
    Google: 166.99,
    Tesla: 269.19,
    Facebook: 573.25,
    Netflix: 754.68,
    Amazon: 187.83
};

// Set up the charts and data for each company
const stockData = {};
const stockCharts = {};
const labels = [];
const timeInterval = 5000; // Update every 5 seconds

// Create a chart for each company
for (const company in initialPrices) {
    stockData[company] = [initialPrices[company]]; // Start with initial price
    labels.push('0s'); // Start with 0s
    const ctx = document.getElementById(`${company.toLowerCase()}Chart`).getContext('2d');

    stockCharts[company] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${company} Stock Price ($)`,
                data: stockData[company],
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                },
                y: {
                    display: true,
                    beginAtZero: false
                }
            }
        }
    });
}

// Simulate dynamic updates for each company
let counter = 0;
setInterval(() => {
    counter += 5; // Increase time
    for (const company in initialPrices) {
        const newPrice = getRandomPrice(stockData[company][stockData[company].length - 1]);
        stockData[company].push(newPrice);

        if (stockData[company].length > 20) { // Keep the last 20 data points
            stockData[company].shift();
        }

        stockCharts[company].update(); // Refresh the chart with new data
    }

    // Update labels
    labels.push(`${counter}s`);
    if (labels.length > 20) { // Keep the last 20 labels
        labels.shift();
    }

    // Update all charts with new labels
    for (const company in stockCharts) {
        stockCharts[company].data.labels = labels;
        stockCharts[company].update();
    }

    // Display latest prices
    let stockInfoHtml = '';
    for (const company in stockData) {
        stockInfoHtml += `<p>Latest ${company} Price: $${stockData[company][stockData[company].length - 1].toFixed(2)}</p>`;
    }
    document.getElementById('stock-data').innerHTML = stockInfoHtml;

}, timeInterval);
let expenseData = [];
let expenseChart = null;
document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas context for the stock chart
    const ctx = document.getElementById('stockChart').getContext('2d');

    // Initialize stock prices and labels
    const stockPrices = [34.00];
    const labels = ['0s'];

    // Create the initial chart
    const stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price ($)',
                data: stockPrices,
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    display: true
                },
                y: {
                    display: true,
                    beginAtZero: false
                }
            }
        }
    });

    // Add an event listener to the "Change Price" button
    document.getElementById('changePriceBtn').addEventListener('click', function() {
        // Get the current price
        const currentPrice = stockPrices[stockPrices.length - 1];

        // Calculate a new price with a random fluctuation between -5 and +5
        const newPrice = parseFloat((currentPrice + (Math.random() * 10 - 5)).toFixed(2));

        // Add the new price to the stockPrices array
        stockPrices.push(newPrice);

        // Generate a new label for the x-axis (e.g., "1s", "2s", ...)
        const nextLabel = `${stockPrices.length - 1}s`;
        labels.push(nextLabel);

        // Update the chart with the new data
        stockChart.update();

        // Update the displayed stock price
        document.getElementById('stockPrice').textContent = newPrice.toFixed(2);
    });
});

function addExpense() {
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (name && !isNaN(amount)) {
        expenseData.push({
            name: name,
            amount: amount
        });
        updateChart();
    }
}

function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    const labels = expenseData.map(expense => expense.name);
    const data = expenseData.map(expense => expense.amount);

    if (expenseChart instanceof Chart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: generateColors(data.length),
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

function generateColors(length) {
    const colors = [];
    for (let i = 0; i < length; i++) {
        const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`;
        colors.push(color);
    }
    return colors;
}

function clearExpenses() {
    expenseData = [];
    updateChart();
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
}

function calculateGoal() {
    const goalName = document.getElementById("goalName").value;
    const goalAmount = parseFloat(document.getElementById("goalAmount").value);
    const goalSavings = parseFloat(document.getElementById("goalSavings").value);
    const goalMonthlySavings = parseFloat(document.getElementById("goalMonthlySavings").value);

    if (isNaN(goalAmount) || isNaN(goalSavings) || isNaN(goalMonthlySavings)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    if (goalSavings >= goalAmount) {
        document.getElementById("goalResult").innerText = `Congratulations! You have already achieved your ${goalName} goal.`;
        return;
    }

    const remainingAmount = goalAmount - goalSavings;
    const monthsNeeded = Math.ceil(remainingAmount / goalMonthlySavings);

    document.getElementById("goalResult").innerHTML = `
        You need to save for <strong>${monthsNeeded}</strong> more months to reach your <strong>${goalName}</strong> goal.
    `;
}
// Savings vs. Spending Chart
var ctxSavingsSpending = document.getElementById('savingsSpendingChart').getContext('2d');
var savingsSpendingChart = new Chart(ctxSavingsSpending, {
    type: 'doughnut',
    data: {
        labels: ['Savings', 'Spending'],
        datasets: [{
            data: [40, 60], // Example data
            backgroundColor: ['#28a745', '#dc3545']
        }]
    }
});

// Investment Portfolio Diversification Chart
var ctxInvestmentDiversification = document.getElementById('investmentDiversificationChart').getContext('2d');
var investmentDiversificationChart = new Chart(ctxInvestmentDiversification, {
    type: 'pie',
    data: {
        labels: ['Stocks', 'Bonds', 'Real Estate', 'Commodities', 'Cash'],
        datasets: [{
            data: [35, 25, 20, 10, 10], // Example data
            backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8']
        }]
    }
});
// Investment Portfolio Diversification Pie Chart
var ctxPortfolio = document.getElementById('investmentDiversificationChart').getContext('2d');
var investmentDiversificationChart = new Chart(ctxPortfolio, {
    type: 'pie',
    data: {
        labels: ['Stocks', 'Bonds', 'Real Estate', 'Commodities', 'Cash'],
        datasets: [{
            data: [40, 20, 20, 10, 10],
            backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

function redirectToChart(chartId) {
    // Hide all charts
    document.getElementById('conservativeChart').style.display = 'none';
    document.getElementById('balancedChart').style.display = 'none';
    document.getElementById('growthChart').style.display = 'none';

    // Show the selected chart
    document.getElementById(chartId).style.display = 'block';

    // Load the chart
    loadChart(chartId);
}

function loadChart(chartId) {
    let ctx;
    let data;
    if (chartId === 'conservativeChart') {
        ctx = document.getElementById('conservativePie').getContext('2d');
        data = [70, 20, 10]; // Example allocation
    } else if (chartId === 'balancedChart') {
        ctx = document.getElementById('balancedPie').getContext('2d');
        data = [50, 30, 20]; // Example allocation
    } else if (chartId === 'growthChart') {
        ctx = document.getElementById('growthPie').getContext('2d');
        data = [30, 40, 30]; // Example allocation
    }

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Bonds', 'Stocks', 'Cash'],
            datasets: [{
                data: data,
                backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function calculateSavings() {
    const income = parseFloat(document.getElementById('income').value);
    const duration = parseInt(document.getElementById('duration').value);
    const emergencyPercentage = parseFloat(document.getElementById('emergency').value);
    const travelPercentage = parseFloat(document.getElementById('travel').value);
    const investmentPercentage = parseFloat(document.getElementById('investment').value);

    // Basic validation
    if (isNaN(income) || isNaN(duration) || duration <= 0 || isNaN(emergencyPercentage) || isNaN(travelPercentage) || isNaN(investmentPercentage)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate monthly total and daily income
    const dailyIncome = income / 30; // Assuming 30 days in a month
    const adjustedIncome = dailyIncome * duration; // Adjusted for the user-defined duration

    // Calculate total and daily savings for each goal
    const emergencySavings = (adjustedIncome * emergencyPercentage) / 100;
    const travelSavings = (adjustedIncome * travelPercentage) / 100;
    const investmentSavings = (adjustedIncome * investmentPercentage) / 100;
    const totalSavings = emergencySavings + travelSavings + investmentSavings;

    // Daily savings calculations
    const dailyEmergency = emergencySavings / duration;
    const dailyTravel = travelSavings / duration;
    const dailyInvestment = investmentSavings / duration;

    // Display the results
    document.getElementById('emergency-result').textContent = `Emergency Fund: ₹${emergencySavings.toFixed(2)} (₹${dailyEmergency.toFixed(2)} per day)`;
    document.getElementById('travel-result').textContent = `Travel Fund: ₹${travelSavings.toFixed(2)} (₹${dailyTravel.toFixed(2)} per day)`;
    document.getElementById('investment-result').textContent = `Investment: ₹${investmentSavings.toFixed(2)} (₹${dailyInvestment.toFixed(2)} per day)`;
    document.getElementById('total-result').textContent = `Total Allocated: ₹${totalSavings.toFixed(2)}`;
}
// Function to calculate debt
function calculateDebt() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value) / 100 / 12; // Monthly interest rate
    const monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value);
    const monthlyPayment = parseFloat(document.getElementById("monthlyPayment").value);

    // Validate inputs
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(monthlyIncome) || isNaN(monthlyPayment)) {
        document.getElementById("result").innerHTML = "Please enter valid numeric values.";
        document.getElementById("expensesBreakdown").innerHTML = "";
        document.getElementById("monthlyBreakdown").innerHTML = "";
        return;
    }

    // Calculate estimated monthly expenses based on income
    const essentials = monthlyIncome * 0.50; // 50% for essentials
    const savings = monthlyIncome * 0.20; // 20% for savings
    const discretionary = monthlyIncome * 0.30; // 30% for discretionary spending
    const totalExpenses = essentials + discretionary;

    // Display estimated monthly expenses breakdown
    document.getElementById("expensesBreakdown").innerHTML = `
        <p>Estimated Monthly Expenses Breakdown:</p>
        <ul>
            <li>Essentials (50%): ₹${essentials.toFixed(2)}</li>
            <li>Savings (20%): ₹${savings.toFixed(2)}</li>
            <li>Discretionary (30%): ₹${discretionary.toFixed(2)}</li>
            <li><strong>Total Estimated Monthly Expenses: ₹${totalExpenses.toFixed(2)}</strong></li>
        </ul>
    `;

    // Check if monthly payment is affordable after expenses
    const netAvailable = monthlyIncome - totalExpenses;
    if (monthlyPayment > netAvailable) {
        document.getElementById("result").innerHTML = "Insufficient funds after monthly expenses to make the debt payment. Please adjust your values.";
        document.getElementById("monthlyBreakdown").innerHTML = "";
        return;
    }

    // Calculate debt payoff details
    let months = 0;
    let balance = loanAmount;
    let totalInterest = 0;
    let monthlyData = [];

    while (balance > 0) {
        const interest = balance * interestRate;
        const principalPayment = monthlyPayment - interest;

        // If principal payment is negative or zero, exit loop
        if (principalPayment <= 0) {
            document.getElementById("result").innerHTML = "Monthly payment is insufficient to cover interest. Please increase your payment.";
            document.getElementById("monthlyBreakdown").innerHTML = "";
            return;
        }

        balance -= principalPayment;
        totalInterest += interest;
        months++;

        // Store monthly data
        monthlyData.push({
            month: months,
            balance: balance > 0 ? balance.toFixed(2) : "0.00",
            interest: interest.toFixed(2),
            principalPayment: principalPayment.toFixed(2)
        });

        // Prevent rounding errors in the last payment
        if (balance < 0.01) {
            balance = 0;
        }
    }

    // Display summary results
    document.getElementById("result").innerHTML = `
        <p>It will take <strong>${months}</strong> months to pay off your debt.</p>
        <p>Total interest paid: <strong>₹${totalInterest.toFixed(2)}</strong></p>
    `;

    // Display monthly breakdown table
    displayMonthlyBreakdown(monthlyData);
}

// Function to display monthly breakdown table
function displayMonthlyBreakdown(monthlyData) {
    let tableHTML = `
        <table>
            <tr>
                <th>Month</th>
                <th>Remaining Balance (₹)</th>
                <th>Interest Paid (₹)</th>
                <th>Principal Payment (₹)</th>
            </tr>
    `;

    monthlyData.forEach(data => {
        tableHTML += `
            <tr>
                <td>${data.month}</td>
                <td>${data.balance}</td>
                <td>${data.interest}</td>
                <td>${data.principalPayment}</td>
            </tr>
        `;
    });

    tableHTML += `</table>`;

    document.getElementById("monthlyBreakdown").innerHTML = tableHTML;
}
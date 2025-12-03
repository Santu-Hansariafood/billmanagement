export const initialBills = [
  {
    id: 1,
    date: '2024-01-05',
    billPeriod: 'January 2024',
    billFrom: 'Electric Company',
    billAmount: '1250.00',
    billDueDate: '2024-01-25',
    priority: 'high',
    remarks: 'Higher usage this month due to winter',
    isPaid: false
  },
  {
    id: 2,
    date: '2024-01-08',
    billPeriod: 'January 2024',
    billFrom: 'Water Supply',
    billAmount: '450.00',
    billDueDate: '2024-01-30',
    priority: 'medium',
    remarks: '',
    isPaid: false
  },
  {
    id: 3,
    date: '2024-01-10',
    billPeriod: 'January 2024',
    billFrom: 'Internet Service Provider',
    billAmount: '899.00',
    billDueDate: '2024-01-20',
    priority: 'high',
    remarks: 'Fiber connection - monthly plan',
    isPaid: false
  },
  {
    id: 4,
    date: '2023-12-28',
    billPeriod: 'December 2023',
    billFrom: 'Gas Company',
    billAmount: '680.00',
    billDueDate: '2024-01-15',
    priority: 'medium',
    remarks: '',
    isPaid: true,
    paymentDate: '2024-01-12',
    paymentAmount: '680.00'
  },
  {
    id: 5,
    date: '2024-01-01',
    billPeriod: 'January 2024',
    billFrom: 'Mobile Network',
    billAmount: '399.00',
    billDueDate: '2024-01-28',
    priority: 'low',
    remarks: 'Postpaid plan with data rollover',
    isPaid: false
  }
]
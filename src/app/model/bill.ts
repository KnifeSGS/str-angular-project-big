export class Bill {
  id: number = 0;
  orderID: number = 0;
  amount: number = 1;
  status: string = 'new';
  constructor() { }
}
export class BillAttributes{
  id: string = 'ID';
  orderID: string = 'Order ID';
  amount: string = 'Amount';
  status: string = 'Status';
}

export class BillSummaryData {
  totalBills: number = 0;
  totalItems: number = 0;
  totalPaid: number = 0;
  totalNew: number = 0;
}
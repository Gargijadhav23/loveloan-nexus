import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  loanId: string;
  asset: string;
  amount: string;
  borrower: string;
  lender: string;
  status: "active" | "repaid" | "liquidated" | "pending";
  txHash: string;
  timestamp: string;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalDeposits: "125,450.00",
    activeLoans: "89,200.00",
    totalRepayments: "45,300.00",
    liquidations: "2,100.00"
  });

  useEffect(() => {
    // Simulate fetching transactions
    const mockTransactions: Transaction[] = [
      {
        loanId: "LOAN-001",
        asset: "ETH",
        amount: "10.5",
        borrower: "0x742d...bEb3",
        lender: "0x5aAe...eAed",
        status: "active",
        txHash: "0x1234...5678",
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        loanId: "LOAN-002",
        asset: "USDC",
        amount: "5000",
        borrower: "0x8f3C...4D2a",
        lender: "0x2B4e...9C1f",
        status: "repaid",
        txHash: "0x8765...4321",
        timestamp: new Date(Date.now() - 7200000).toISOString()
      },
      {
        loanId: "LOAN-003",
        asset: "DAI",
        amount: "2500",
        borrower: "0x3C4a...8E2b",
        lender: "0x9D2f...3A4c",
        status: "pending",
        txHash: "0xabcd...efgh",
        timestamp: new Date(Date.now() - 1800000).toISOString()
      },
      {
        loanId: "LOAN-004",
        asset: "WBTC",
        amount: "0.5",
        borrower: "0x1A2b...3C4d",
        lender: "0x5E6f...7G8h",
        status: "liquidated",
        txHash: "0xijkl...mnop",
        timestamp: new Date(Date.now() - 10800000).toISOString()
      }
    ];
    setTransactions(mockTransactions);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
      case "repaid":
        return <Badge className="bg-success/10 text-success border-success/20">Repaid</Badge>;
      case "liquidated":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Liquidated</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const statsCards = [
    {
      title: "Total Deposits",
      value: `$${stats.totalDeposits}`,
      icon: ArrowUpRight,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Active Loans",
      value: `$${stats.activeLoans}`,
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Total Repayments",
      value: `$${stats.totalRepayments}`,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Liquidations",
      value: `$${stats.liquidations}`,
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-primary">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transactions Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent lending and borrowing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Lender</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tx Hash</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.loanId}>
                      <TableCell className="font-medium">{tx.loanId}</TableCell>
                      <TableCell>{tx.asset}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell className="font-mono text-xs">{tx.borrower}</TableCell>
                      <TableCell className="font-mono text-xs">{tx.lender}</TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                      <TableCell className="font-mono text-xs">{tx.txHash}</TableCell>
                      <TableCell>{new Date(tx.timestamp).toLocaleTimeString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
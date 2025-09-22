import { useState } from "react";
import { Wallet, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { WalletConnect } from "@/components/WalletConnect";

const Borrow = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    assetType: "",
    loanAmount: "",
    collateral: null as File | null,
    walletAddress: ""
  });
  const [isConnected, setIsConnected] = useState(false);
  const [loanStatus, setLoanStatus] = useState<"pending" | "approved" | "rejected" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    // Simulate loan processing
    setLoanStatus("pending");
    
    setTimeout(() => {
      setLoanStatus("approved");
      toast({
        title: "Loan Request Submitted!",
        description: "Your loan request has been processed and approved",
      });
    }, 2000);
  };

  const handleCollateralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, collateral: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Borrow Assets</CardTitle>
            <CardDescription>
              Request a loan by providing collateral and get instant approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <WalletConnect onConnectionChange={setIsConnected} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="assetType">Asset Type to Borrow</Label>
                <Select 
                  value={formData.assetType} 
                  onValueChange={(value) => setFormData({ ...formData, assetType: value })}
                >
                  <SelectTrigger id="assetType">
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdc">USDC (ERC-20)</SelectItem>
                    <SelectItem value="usdt">USDT (ERC-20)</SelectItem>
                    <SelectItem value="dai">DAI (ERC-20)</SelectItem>
                    <SelectItem value="wbtc">WBTC (ERC-20)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  step="0.000001"
                  placeholder="0.0"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="collateral">Collateral Document</Label>
                <div className="mt-2">
                  <Input
                    id="collateral"
                    type="file"
                    onChange={handleCollateralChange}
                    className="cursor-pointer"
                    required
                  />
                  {formData.collateral && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selected: {formData.collateral.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  type="text"
                  placeholder="0x..."
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                disabled={!isConnected || loanStatus === "pending"}
              >
                <FileText className="mr-2 h-5 w-5" />
                {loanStatus === "pending" ? "Processing..." : "Request Loan"}
              </Button>
            </form>

            {loanStatus === "pending" && (
              <Alert className="mt-6 border-warning/50 bg-warning/10">
                <AlertCircle className="h-4 w-4 text-warning" />
                <AlertDescription>
                  <strong>Processing loan request...</strong>
                  <br />
                  Please wait while we verify your collateral and process your request.
                </AlertDescription>
              </Alert>
            )}

            {loanStatus === "approved" && (
              <Alert className="mt-6 border-success/50 bg-success/10">
                <AlertCircle className="h-4 w-4 text-success" />
                <AlertDescription>
                  <strong>Loan Approved!</strong>
                  <br />
                  Your loan request has been approved. Funds will be transferred to your wallet shortly.
                </AlertDescription>
              </Alert>
            )}

            {loanStatus === "rejected" && (
              <Alert className="mt-6 border-destructive/50 bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription>
                  <strong>Loan Rejected</strong>
                  <br />
                  Unfortunately, your loan request could not be approved at this time.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Borrow;
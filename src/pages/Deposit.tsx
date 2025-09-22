import { useState } from "react";
import { Wallet, Upload, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { WalletConnect } from "@/components/WalletConnect";

const Deposit = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    assetType: "",
    amount: "",
    walletAddress: "",
    document: null as File | null
  });
  const [isConnected, setIsConnected] = useState(false);
  const [txHash, setTxHash] = useState("");

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

    // Simulate transaction
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    setTxHash(mockTxHash);
    
    toast({
      title: "Deposit Successful!",
      description: `Transaction hash: ${mockTxHash.slice(0, 10)}...`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, document: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Deposit / Lend Assets</CardTitle>
            <CardDescription>
              Deposit your crypto assets and earn interest by lending them out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <WalletConnect onConnectionChange={setIsConnected} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="assetType">Asset Type</Label>
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
                <Label htmlFor="amount">Deposit Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.000001"
                  placeholder="0.0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
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

              <div>
                <Label htmlFor="document">Supporting Document (Optional)</Label>
                <div className="mt-2">
                  <Input
                    id="document"
                    type="file"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {formData.document && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selected: {formData.document.name}
                    </p>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                disabled={!isConnected}
              >
                <Upload className="mr-2 h-5 w-5" />
                Deposit Assets
              </Button>
            </form>

            {txHash && (
              <Alert className="mt-6 border-success/50 bg-success/10">
                <AlertCircle className="h-4 w-4 text-success" />
                <AlertDescription>
                  <strong>Transaction Confirmed!</strong>
                  <br />
                  Transaction Hash: <span className="font-mono text-sm">{txHash}</span>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Deposit;
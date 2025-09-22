import { useState } from "react";
import { Search, CheckCircle, XCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VerificationResult {
  loanId: string;
  status: "valid" | "invalid";
  borrower: string;
  lender: string;
  amount: string;
  asset: string;
  timestamp: string;
  blockNumber: number;
  txHash: string;
}

const Verify = () => {
  const [loanId, setLoanId] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyById = async () => {
    if (!loanId) return;
    
    setIsVerifying(true);
    
    // Simulate blockchain verification
    setTimeout(() => {
      setVerificationResult({
        loanId: loanId,
        status: Math.random() > 0.3 ? "valid" : "invalid",
        borrower: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
        lender: "0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed",
        amount: "10.5",
        asset: "ETH",
        timestamp: new Date().toISOString(),
        blockNumber: 18234567,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`
      });
      setIsVerifying(false);
    }, 1500);
  };

  const handleVerifyByDocument = async () => {
    if (!document) return;
    
    setIsVerifying(true);
    
    // Simulate document hash verification
    setTimeout(() => {
      setVerificationResult({
        loanId: `LOAN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        status: Math.random() > 0.2 ? "valid" : "invalid",
        borrower: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
        lender: "0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed",
        amount: "5.25",
        asset: "USDC",
        timestamp: new Date().toISOString(),
        blockNumber: 18234568,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`
      });
      setIsVerifying(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Verify Loan</CardTitle>
            <CardDescription>
              Verify loan details and authenticity on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="id" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="id">Verify by Loan ID</TabsTrigger>
                <TabsTrigger value="document">Verify by Document</TabsTrigger>
              </TabsList>
              
              <TabsContent value="id" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="loanId">Loan ID</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="loanId"
                      type="text"
                      placeholder="Enter loan ID..."
                      value={loanId}
                      onChange={(e) => setLoanId(e.target.value)}
                    />
                    <Button 
                      onClick={handleVerifyById}
                      disabled={!loanId || isVerifying}
                      className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="document" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="documentUpload">Upload Document for Hash Verification</Label>
                  <div className="mt-2 space-y-2">
                    <Input
                      id="documentUpload"
                      type="file"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {document && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {document.name}
                      </p>
                    )}
                    <Button 
                      onClick={handleVerifyByDocument}
                      disabled={!document || isVerifying}
                      className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Verify Document
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {isVerifying && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-muted-foreground">Verifying on blockchain...</p>
              </div>
            )}

            {verificationResult && !isVerifying && (
              <div className="mt-6 space-y-4">
                <Alert className={verificationResult.status === "valid" 
                  ? "border-success/50 bg-success/10" 
                  : "border-destructive/50 bg-destructive/10"}>
                  <div className="flex items-center gap-2">
                    {verificationResult.status === "valid" ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <AlertDescription className="font-semibold text-lg">
                      {verificationResult.status === "valid" ? "Valid" : "Invalid / Tampered"}
                    </AlertDescription>
                  </div>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Blockchain Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Loan ID:</span>
                      <span className="font-mono">{verificationResult.loanId}</span>
                      
                      <span className="text-muted-foreground">Amount:</span>
                      <span>{verificationResult.amount} {verificationResult.asset}</span>
                      
                      <span className="text-muted-foreground">Borrower:</span>
                      <span className="font-mono text-xs truncate">{verificationResult.borrower}</span>
                      
                      <span className="text-muted-foreground">Lender:</span>
                      <span className="font-mono text-xs truncate">{verificationResult.lender}</span>
                      
                      <span className="text-muted-foreground">Block Number:</span>
                      <span>{verificationResult.blockNumber}</span>
                      
                      <span className="text-muted-foreground">Timestamp:</span>
                      <span>{new Date(verificationResult.timestamp).toLocaleString()}</span>
                      
                      <span className="text-muted-foreground">Tx Hash:</span>
                      <span className="font-mono text-xs truncate">{verificationResult.txHash}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Verify;
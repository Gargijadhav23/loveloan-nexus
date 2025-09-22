import { useState, useEffect } from "react";
import { Wallet, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ethers } from "ethers";

interface WalletConnectProps {
  onConnectionChange?: (connected: boolean) => void;
}

export const WalletConnect = ({ onConnectionChange }: WalletConnectProps) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0].address);
          onConnectionChange?.(true);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive"
      });
      setIsConnecting(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setIsConnected(true);
        setAddress(accounts[0]);
        onConnectionChange?.(true);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    onConnectionChange?.(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${isConnected ? "bg-success/10" : "bg-muted"}`}>
          <Wallet className={`h-5 w-5 ${isConnected ? "text-success" : "text-muted-foreground"}`} />
        </div>
        <div>
          <p className="text-sm font-medium">
            {isConnected ? "Wallet Connected" : "No Wallet Connected"}
          </p>
          {isConnected && address && (
            <p className="text-xs text-muted-foreground font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          )}
        </div>
      </div>
      
      {!isConnected ? (
        <Button 
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <Button 
          onClick={disconnectWallet}
          variant="outline"
          size="sm"
          className="border-destructive text-destructive hover:bg-destructive/10"
        >
          <X className="h-4 w-4 mr-1" />
          Disconnect
        </Button>
      )}
    </div>
  );
};
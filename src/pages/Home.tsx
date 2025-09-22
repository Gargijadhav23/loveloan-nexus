import { ArrowRight, Shield, TrendingUp, Wallet, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "All transactions are secured by blockchain technology with complete transparency"
    },
    {
      icon: TrendingUp,
      title: "Competitive Rates",
      description: "Get the best lending and borrowing rates in the DeFi ecosystem"
    },
    {
      icon: Wallet,
      title: "Easy Integration",
      description: "Connect your MetaMask wallet and start lending or borrowing instantly"
    },
    {
      icon: FileCheck,
      title: "Verified On-Chain",
      description: "All loans and transactions are verifiable on the blockchain"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Blockchain-Based DeFi Lending & Borrowing System
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience the future of finance with our secure, transparent, and tamper-proof blockchain lending platform. 
              Deposit assets, request loans, and verify transactions—all on-chain.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 transition-opacity"
                onClick={() => navigate('/deposit')}
              >
                Deposit / Lend
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => navigate('/borrow')}
              >
                Borrow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => navigate('/verify')}
              >
                Verify Loan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect your wallet and join the decentralized finance revolution
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 transition-opacity"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
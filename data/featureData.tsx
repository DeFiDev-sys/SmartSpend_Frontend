import ExpensesTracking from "@/components/featuresIcons/ExpensesTracking";
import BankSync from "../components/featuresIcons/BankSync";
import BudgetPlanning from "../components/featuresIcons/BudgetPlanning";
import FinaicialGoal from "../components/featuresIcons/FinaicialGoal";
import InsightReport from "@/components/featuresIcons/InsightReport";
import SmartAlert from "@/components/featuresIcons/SmartAlert";

export const features = [
  {
    icon: <ExpensesTracking />,
    title: "Expense Tracking",
    desc: "Easily log and categorize all your expenses in one place.",
  },
  {
    icon: <InsightReport />,
    title: "Insightful Reports",
    desc: "Get visual reports and analytics to understand your spending habits.",
  },
  {
    icon: <BudgetPlanning />,
    title: "Budget Planning",
    desc: "Set budgets for different categories and track your progress.",
  },
  {
    icon: <SmartAlert />,
    title: "Smart Alerts",
    desc: "Get notified about unusual spending or when you're close to budget limits.",
  },
  { icon: <BankSync />, title: "Bank Sync", desc: "Connect your bank accounts for automatic expense tracking." },
  { icon: <FinaicialGoal />, title: "Financial Goals", desc: "Set and track financial goals to achieve your dreams." },
];

export const priceplanning = [
  {
    plan: "Free",
    price: "$0",
    priceDesc: "Forever free",
    desc: ["Basic expense tracking", "Up to 50 transactions", "Monthly reports"],
    btnText: "Get Started",
  },
  {
    plan: "Pro",
    price: "$9.99",
    priceDesc: "Per month",
    desc: ["Unlimited transactions", "Advanced analytics", "Budget planning", "1 bank connection"],
    btnText: "Subscribe Now",
  },
  {
    plan: "Premium",
    price: "$19.99",
    priceDesc: "Per month",
    desc: ["Everything in Pro", "Multiple bank connections", "Financial advisor access", "Priority support"],
    btnText: "Go Premium",
  },
];

export const footerLinks = {
  products: [
    { name: "Features", linkPath: "/" },
    { name: "Pricing", linkPath: "/" },
    { name: "Integrations", linkPath: "/" },
    { name: "Roadmap", linkPath: "/" },
  ],
  company: [
    { name: "About", linkPath: "/" },
    { name: "Blog", linkPath: "/" },
    { name: "Careers", linkPath: "/" },
    { name: "Contact", linkPath: "/" },
  ],
  legal: [
    { name: "Privacy", linkPath: "/" },
    { name: "Terms", linkPath: "/" },
    { name: "Cookie Policy", linkPath: "/" },
    { name: "Licenses", linkPath: "/" },
  ],
};

import ExpensesTracking from "@/components/featuresIcons/ExpensesTracking";
import BankSync from "../components/featuresIcons/BankSync";
import BudgetPlanning from "../components/featuresIcons/BudgetPlanning";
import FinaicialGoal from "../components/featuresIcons/FinaicialGoal";
import InsightReport from "@/components/featuresIcons/InsightReport";
import SmartAlert from "@/components/featuresIcons/SmartAlert";
import CountUp from "react-countup";
import PlusIcon from "@/components/Svgs/plusIcon";
import GoodIcon from "@/components/Svgs/goodIcon";
import ShieldIcon from "@/components/Svgs/shieldIcon";

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

export const aboutData = {
  achievements: [
    {
      tags: <CountUp start={1} end={100} duration={5} />,
      headlines: "Active Users",
      writeUps: "Trust SmartSpend for their expense tracking needs",
      preInitials: "",
      postInitials: "K",
    },
    {
      tags: <CountUp start={0} end={2} duration={10} />,
      headlines: "Expenses Tracked",
      writeUps: "Managed through our platform anually",
      preInitials: "$",
      postInitials: "B+",
    },
    {
      tags: <CountUp start={1} end={15} duration={2.5} />,
      headlines: "Countries",
      writeUps: "Supporting users worldwide",
      postInitials: "+",
    },
  ],
  values: [
    {
      icons: <PlusIcon />,
      title: "Simplicity",
      desc: "We believe in making financial management straightforward and accessible.",
    },
    { icons: <GoodIcon />, title: "Trust", desc: "Security and reliability are at the core of our service." },
    { icons: <ShieldIcon />, title: "Innovation", desc: "Continuously improving to provide the best financial tools." },
  ],
  teamManagers: [
    {
      pics: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      firstName: "Sarah",
      lastName: "Johnson",
      post: "CEO & Co-founder",
    },
    {
      pics: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      firstName: "Michael",
      lastName: "Chen",
      post: "CEO & Co-founder",
    },
    {
      pics: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      firstName: "Emily",
      lastName: "Rodriguez",
      post: "Head of Product",
    },
  ],
};

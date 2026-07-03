export const stats = [
  { label: "Total Users", value: "142,891", change: "+12.5%", up: true, icon: "users" },
  { label: "Total Submitted Chronicles", value: "8,247", change: "+15.3%", up: true, icon: "file" },
  { label: "Verification Requests", value: "324", change: "+8.2%", up: true, icon: "check" },
  { label: "Campaign ROI", value: "33.4M", change: "-2.1%", up: false, icon: "chart" },
] as const;

export const userGrowth = [
  { month: "Jan", users: 82000 },
  { month: "Feb", users: 86000 },
  { month: "Mar", users: 84500 },
  { month: "Apr", users: 90000 },
  { month: "May", users: 93500 },
  { month: "Jun", users: 91000 },
  { month: "Jul", users: 97000 },
  { month: "Aug", users: 101500 },
  { month: "Sep", users: 99000 },
  { month: "Oct", users: 106000 },
  { month: "Nov", users: 112500 },
  { month: "Dec", users: 121000 },
];

export const contentDistribution = [
  { category: "Health", count: 1500 },
  { category: "Education", count: 1900 },
  { category: "Infrastructure", count: 1000 },
  { category: "Security", count: 1600 },
  { category: "Economy", count: 1450 },
  { category: "Environment", count: 1800 },
  { category: "Social", count: 1400 },
];

export type ReviewStatus = "Escalated" | "Under review" | "Pending";
export type ReviewPriority = "High" | "Medium" | "Low";

export const awaitingReview = [
  {
    id: "C-1923",
    author: "user_2847",
    type: "Post",
    reason: "Hate Speech",
    status: "Escalated" as ReviewStatus,
    priority: "High" as ReviewPriority,
    timestamp: "2025-06-13 11:25",
  },
  {
    id: "P-812",
    author: "AdCorp_Nigeria",
    type: "Petition",
    reason: "Manual Verification Required",
    status: "Under review" as ReviewStatus,
    priority: "Low" as ReviewPriority,
    timestamp: "2025-06-13 10:56",
  },
  {
    id: "A-3721",
    author: "activist_lagos",
    type: "Advert",
    reason: "Misinformation",
    status: "Pending" as ReviewStatus,
    priority: "Medium" as ReviewPriority,
    timestamp: "2025-06-13 09:10",
  },
];

export type CampaignStatus = "Active" | "Completed";

export const topCampaigns = [
  {
    campaign: "Political Campaign Q1 2024",
    type: "Sponsorship",
    status: "Active" as CampaignStatus,
    reach: "847,291",
    engagement: 12.8,
    clicks: "23,847",
    roi: "342%",
  },
  {
    campaign: "Brand Awareness Drive",
    type: "Advert",
    status: "Active" as CampaignStatus,
    reach: "523,186",
    engagement: 8.4,
    clicks: "18,923",
    roi: "342%",
  },
  {
    campaign: "Event Promotion Campaign",
    type: "Advert",
    status: "Completed" as CampaignStatus,
    reach: "692,847",
    engagement: 15.2,
    clicks: "31,247",
    roi: "389%",
  },
];

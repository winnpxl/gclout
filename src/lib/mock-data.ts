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
export type UserStatus = "Active" | "Suspended";
export interface UserProfile {
  dateOfBirth: string;
  country: string;
  nationality: string;
  state: string;
  ward: string;
  accountType: string;
  partyAffiliation: string;
  dateJoined: string;
  joinedAs: string;
}

export interface RoleApplication {
  requestedRole: string;
  submitted: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: UserStatus;
  lastLogin: string;
  partyMember?: string;
  pendingApplication?: RoleApplication;
  profile: UserProfile;
}

export const users: AdminUser[] = [
  { id: "rebecca-bashir", name: "Rebecca Bashir", email: "beccahye@icloud.com", phone: "+234 812 004 5477", role: "Citizen", status: "Active" as UserStatus, lastLogin: "Dec 1, 2024, 9:30", partyMember: "APC member", pendingApplication: { requestedRole: "Elected Rep", submitted: "June 2, 2025" } as RoleApplication, profile: { dateOfBirth: "April 16, 1999", country: "Nigeria", nationality: "Nigerian", state: "Lagos", ward: "Makoko", accountType: "Citizen", partyAffiliation: "Labour Party", dateJoined: "June 24, 2023", joinedAs: "Member" } as UserProfile },
  { id: "lydia-durojaiye", name: "Lydia Durojaiye", email: "phoenixbaker@outlook.com", phone: "+234 909 078 2553", role: "Elected Rep", status: "Suspended" as UserStatus, lastLogin: "Nov 1, 2025, 9:30", profile: { dateOfBirth: "August 2, 1985", country: "Nigeria", nationality: "Nigerian", state: "Oyo", ward: "Ibadan North", accountType: "Elected Rep", partyAffiliation: "APC", dateJoined: "March 12, 2022", joinedAs: "Representative" } as UserProfile },
  { id: "candice-woo", name: "Candice Woo", email: "candicr@aol.com", phone: "+234 915 899 2253", role: "Appointed Rep", status: "Active" as UserStatus, lastLogin: "Oct 1, 2025, 9:30", profile: { dateOfBirth: "January 30, 1990", country: "Nigeria", nationality: "Nigerian", state: "Abuja FCT", ward: "Garki", accountType: "Appointed Rep", partyAffiliation: "PDP", dateJoined: "May 5, 2023", joinedAs: "Representative" } as UserProfile },
  { id: "susan-adeleke", name: "Susan Adeleke", email: "suan@gmail.com", phone: "+234 814 008 9294", role: "Citizen", status: "Suspended" as UserStatus, lastLogin: "Jul 1, 2025, 9:30", profile: { dateOfBirth: "October 11, 1995", country: "Nigeria", nationality: "Nigerian", state: "Ogun", ward: "Abeokuta South", accountType: "Citizen", partyAffiliation: "None", dateJoined: "August 19, 2023", joinedAs: "Member" } as UserProfile },
  { id: "david-olowookere", name: "David Olowookere", email: "davido@hotmail.com", phone: "+234 904 899 1379", role: "Page Admin", status: "Suspended" as UserStatus, lastLogin: "Jun 1, 2025, 9:30", profile: { dateOfBirth: "June 7, 1988", country: "Nigeria", nationality: "Nigerian", state: "Kwara", ward: "Ilorin West", accountType: "Page Admin", partyAffiliation: "None", dateJoined: "February 2, 2024", joinedAs: "Admin" } as UserProfile },
  { id: "toyin-oyidamola", name: "Toyin Oyidamola", email: "toyintomato@hotmail.com", phone: "+234 904 899 1379", role: "Page", status: "Suspended" as UserStatus, lastLogin: "Jun 1, 2025, 9:30", profile: { dateOfBirth: "December 25, 1992", country: "Nigeria", nationality: "Nigerian", state: "Osun", ward: "Osogbo", accountType: "Page", partyAffiliation: "None", dateJoined: "July 30, 2024", joinedAs: "Page" } as UserProfile },
  { id: "mary-obubra", name: "Mary Obubra", email: "matuyui@hotmail.com", phone: "+234 904 899 1379", role: "Page Admin", status: "Active" as UserStatus, lastLogin: "Jun 1, 2025, 9:30", profile: { dateOfBirth: "March 3, 1993", country: "Nigeria", nationality: "Nigerian", state: "Cross River", ward: "Obubra", accountType: "Page Admin", partyAffiliation: "None", dateJoined: "September 14, 2023", joinedAs: "Admin" } as UserProfile },
  { id: "ugochi-dochie", name: "Ugochi Dochie", email: "ugoo@hotmail.com", phone: "+234 904 899 1379", role: "Page Admin", status: "Suspended" as UserStatus, lastLogin: "Jun 1, 2025, 9:30", profile: { dateOfBirth: "May 20, 1991", country: "Nigeria", nationality: "Nigerian", state: "Enugu", ward: "Nsukka", accountType: "Page Admin", partyAffiliation: "None", dateJoined: "November 8, 2023", joinedAs: "Admin" } as UserProfile },
];
export type PostModeration = "Flagged" | "Taken down" | "Appealed" | null;
export interface UserPost {
  id: string;
  moderation: PostModeration;
  postedAgo: string;
  text: string;
  likes: number;
  comments: number;
  shares: number;
  embed?:
    | { kind: "event"; title: string; host: string; when: string }
    | { kind: "gallery"; imageCount: number }
    | { kind: "petition"; title: string; description: string; signatures: string };
}
export const userPosts: UserPost[] = [
  {
    id: "post-1",
    moderation: "Flagged",
    postedAgo: "2h",
    text: "Secure and transparent Web3 voting built for the integrity of your DAO, corporate governance, and member-based organization.",
    likes: 247,
    comments: 247,
    shares: 18,
  },
  {
    id: "post-2",
    moderation: null,
    postedAgo: "2h",
    text: "I need this petition to get to the highest of levels.",
    likes: 247,
    comments: 247,
    shares: 18,
    embed: {
      kind: "event",
      title: "State Budget Q&A with Gov. Sanwo-Olu and DG Hamzat.",
      host: "Jonathan Adebola",
      when: "15th May at 8:30pm",
    },
  },
  {
    id: "post-3",
    moderation: "Taken down",
    postedAgo: "2h",
    text: "At the office today! \u{1F44D}✨",
    likes: 247,
    comments: 247,
    shares: 18,
    embed: { kind: "gallery", imageCount: 4 },
  },
  {
    id: "post-4",
    moderation: "Appealed",
    postedAgo: "2h",
    text: "I need this petition to get to the highest of levels.",
    likes: 247,
    comments: 247,
    shares: 18,
    embed: {
      kind: "petition",
      title: "Increase of minimum wage for Civil Servants and Nigerians",
      description:
        "The current state of the economy is becoming unbearable for the average citizen, while they suffer, politicians take what's theirs. This is a petition to increase minimum wage as we see that you're really...",
      signatures: "8,960",
    },
  },
  {
    id: "post-5",
    moderation: null,
    postedAgo: "2h",
    text: "I need this petition to get to the highest of levels.",
    likes: 247,
    comments: 247,
    shares: 18,
  },
];
export const userAnalytics = {
  stats: [
    { label: "Last Active", value: "2 hours ago" },
    { label: "Total Sessions", value: "47" },
    { label: "Daily Active Time", value: "3.2 hrs" },
    { label: "Days Active", value: "23/30" },
    { label: "Total Posts Made", value: "23" },
    { label: "Total Interactions", value: "1,247" },
    { label: "Engagement Rate", value: "54.2%" },
    { label: "Issues Addressed", value: "247" },
  ],
  dailyActivity: [
    { day: "Mon", hours: 12 },
    { day: "Tue", hours: 18 },
    { day: "Wed", hours: 7 },
    { day: "Thu", hours: 13 },
    { day: "Fri", hours: 7 },
    { day: "Sat", hours: 17 },
    { day: "Sun", hours: 12 },
  ],
  governance: [
    { label: "Polls Taken", value: 34 },
    { label: "Petitions Signed", value: 28 },
    { label: "Townhalls Joined", value: 12 },
  ],
  topContent: {
    format: "Text-only",
    interactions: 89,
    text: "Secure and transparent Web3 voting built for the integrity of your DAO, corporate governance, and member-based organization.",
  },
  security: {
    successfulLogins: 47,
    failedAttempts: 2,
    lastLogin: "2 hours ago",
  },
};

export type RequestStatus = "Pending" | "Approved" | "Rejected";
export const roleChangeRequests = [
  { id: "RC-1041", name: "Adaeze Okafor", email: "adaeze.ok@gmail.com", currentRole: "Citizen", requestedRole: "Elected Rep", reason: "Won local government chairmanship election", date: "Jun 9, 2025", status: "Pending" as RequestStatus },
  { id: "RC-1040", name: "Bolaji Adewale", email: "bolaji.a@outlook.com", currentRole: "Citizen", requestedRole: "Page Admin", reason: "Managing official party page", date: "Jun 8, 2025", status: "Pending" as RequestStatus },
  { id: "RC-1038", name: "Chidinma Eze", email: "chidi.eze@yahoo.com", currentRole: "Page", requestedRole: "Page Admin", reason: "Promoted to communications lead", date: "Jun 7, 2025", status: "Approved" as RequestStatus },
  { id: "RC-1035", name: "Musa Ibrahim", email: "musa.i@gmail.com", currentRole: "Citizen", requestedRole: "Appointed Rep", reason: "Appointed commissioner for works", date: "Jun 5, 2025", status: "Pending" as RequestStatus },
  { id: "RC-1033", name: "Funke Alabi", email: "funke.alabi@hotmail.com", currentRole: "Citizen", requestedRole: "Elected Rep", reason: "Insufficient verification documents", date: "Jun 3, 2025", status: "Rejected" as RequestStatus },
  { id: "RC-1030", name: "Emeka Nwosu", email: "emeka.n@icloud.com", currentRole: "Page", requestedRole: "Page Admin", reason: "Taking over page management", date: "Jun 1, 2025", status: "Approved" as RequestStatus },
];
export type AccreditationStatus = "Accredited" | "Pending" | "Revoked";
export const electionObservers = [
  { id: "EO-204", name: "Ngozi Umeh", organization: "YIAGA Africa", email: "n.umeh@yiaga.org", state: "Lagos", election: "2027 General Election", status: "Accredited" as AccreditationStatus },
  { id: "EO-203", name: "Tunde Bakare", organization: "Transition Monitoring Group", email: "t.bakare@tmg.ng", state: "Oyo", election: "2027 General Election", status: "Accredited" as AccreditationStatus },
  { id: "EO-201", name: "Amina Yusuf", organization: "CLEEN Foundation", email: "a.yusuf@cleen.org", state: "Kano", election: "2026 Governorship", status: "Pending" as AccreditationStatus },
  { id: "EO-198", name: "Osaretin Igbinedion", organization: "EU Election Observation", email: "o.igbin@eueom.eu", state: "Edo", election: "2026 Governorship", status: "Accredited" as AccreditationStatus },
  { id: "EO-195", name: "Blessing Chukwu", organization: "NDI Nigeria", email: "b.chukwu@ndi.org", state: "Anambra", election: "2025 Bye-Election", status: "Revoked" as AccreditationStatus },
  { id: "EO-192", name: "Ibrahim Sule", organization: "Situation Room", email: "i.sule@situationroom.ng", state: "Kaduna", election: "2027 General Election", status: "Pending" as AccreditationStatus },
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

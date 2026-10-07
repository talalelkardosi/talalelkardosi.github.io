// =====================================================================
// All site content lives here. Edit this file to update the portfolio.
// Optional fields: leave as "" to hide them — nothing placeholder-like
// is ever rendered on the live page for empty values.
// =====================================================================


// Your photo (https://i.postimg.cc/jdPv1dQ8/IMG-20261002-150340.jpg) with its white background removed.
import talalPortrait from "@/assets/talal-portrait.png";
export const profile = {
  name: "Talal Al-Kardosi",
  firstName: "Talal",
  role: "Freelance Data Analyst",
  typing: ["Data Cleaning", "SQL Analysis", "Interactive Dashboards"],
  usp: "I help businesses turn messy data into clear decisions through careful data cleaning, SQL analysis, and interactive dashboards.",
  // PROFILE PHOTO: leave empty to show the gold "TA" monogram instead.
  photo: talalPortrait,
  monogram: "TA",
};


export const about = [
  "I'm Talal, a freelance data analyst. I take raw, inconsistent data and turn it into answers a business can act on: clean datasets, clear analysis, and dashboards you can explore yourself.",
  "I don't just make charts. In my Nashville Housing project I cleaned 56,477 records, removed 103 duplicates, corrected 1,557 land-use values, and kept every uncertain value flagged instead of guessing, because every change needs a reason based on the data.",
  "I work with Python, SQL, Excel, Power BI and Tableau, and I explain every result in plain language so you always know what the numbers mean and what to do next. I like a good challenge, and a messy dataset is the best kind.",
  "Have a dataset that needs to make sense? Let's talk.",
];

export type ServiceIcon = "clean" | "eda" | "sql" | "dashboard" | "report";
export const services: { title: string; text: string; icon: ServiceIcon }[] = [
  { icon: "clean", title: "Data Cleaning & Preparation", text: "Fix duplicates, missing values, and inconsistent formats, then validate the result so you can trust the numbers." },
  { icon: "eda", title: "Exploratory Data Analysis (EDA)", text: "Find trends, compare segments, and study relationships in your data, with findings and limits documented clearly." },
  { icon: "sql", title: "SQL Analysis", text: "Joins, CTEs, window functions, and reusable views that answer business questions directly from your database." },
  { icon: "dashboard", title: "Dashboards", text: "Interactive KPI dashboards in Power BI, Tableau, and Excel with filters, so you can explore your data and spot patterns yourself." },
  { icon: "report", title: "Reporting", text: "Clear written reports that explain your findings and their limits in plain language, so every result comes with what it means and what to do next." },
];

export type Project = {
  title: string;
  tags: string[];
  githubUrl: string; // "" hides the GitHub badge/button
  reportUrl?: string; // optional: fill to show "View Report"
  dashboardUrl?: string; // optional: fill to show "View Dashboard"
  screenshot?: string; // optional: image path in /public, e.g. "/dashboard.png"
  tool?: string; // optional: dashboard tool name (e.g. "Power BI"), added as a tag
  description?: string;
  dashboardSummary?: string;
  problem: string;
  approach: string;
  approachWorkstreams?: { title: string; description: string }[];
  dashboardFeatures?: string[];
  keyFindings?: string[];
  result: string;
};

export const githubProfile = "https://github.com/talalelkardosi";

export const projects: Project[] = [
  {
    title: "Online Retail: Sales & Customer Analytics",
    tags: ["Python", "Pandas", "NumPy", "RFM", "Cohort Analysis", "HTML/JavaScript"],
    githubUrl: "https://github.com/talalelkardosi/Online-Retail-Customer-Analytics",
    dashboardUrl: "https://talalelkardosi.github.io/Online-Retail-Customer-Analytics/",
    dashboardSummary: "8 interactive sections · Filters · Searchable tables · Data export",
    description:
      "An end-to-end analysis of 541,909 transaction records, combining Python data cleaning, revenue analysis, customer segmentation, cohort retention, and cancellation investigation in an interactive web dashboard.",
    problem:
      "The transaction dataset contains missing customer identifiers, duplicate records, cancellations, non-product transactions, and unusually large orders. The challenge was to establish consistent analytical definitions and understand revenue performance, product concentration, customer purchasing behavior, and cancellation patterns without distorting the results.",
    approach:
      "Built a Python workflow covering data preparation, exploratory analysis, validation, and CSV exports, followed by an interactive web dashboard.",
    approachWorkstreams: [
      {
        title: "Data quality",
        description:
          "Preserved all 541,909 source rows and their identifiers. Flagged additional exact duplicates and excluded them from analytical scopes. Standardized data types and separated product transactions from shipping, fees, discounts, and other non-product lines.",
      },
      {
        title: "Revenue and markets",
        description:
          "Analyzed monthly gross revenue, cancellation value, net product revenue, order volume, average order value, and country performance. Marked December 2011 as a partial month to avoid misleading comparisons.",
      },
      {
        title: "Products",
        description:
          "Reviewed product performance and revenue concentration using Pareto analysis. Investigated product cancellation ratios and their concentration in individual invoices and customers.",
      },
      {
        title: "Customers",
        description:
          "Calculated recency, purchase frequency, and net monetary value. Applied explicit RFM rules to 4,322 customers with positive net value, separating 12 purchasing customers with non-positive net value for review. Examined one-time and repeat purchasing behavior.",
      },
      {
        title: "Retention",
        description:
          "Built monthly cohorts based on first observed purchase and measured activity in subsequent complete calendar months. Kept unavailable future observations missing rather than treating them as zero.",
      },
      {
        title: "Cancellations",
        description:
          "Investigated high-value cancellation invoices. Identified two matched sale/cancellation pairs and tested a sensitivity scenario that excludes both sides of each pair while preserving net revenue.",
      },
      {
        title: "Validation and delivery",
        description:
          "Passed 11 analysis validation checks covering reconciliation, customer scopes, cohort coverage, reversal sensitivity, and source-row integrity. Exported 21 verified analytical CSV tables, with an export manifest and decision log.",
      },
    ],
    dashboardFeatures: [
      "Eight sections: Executive Overview, Revenue & Growth, Markets, Products, Customers & RFM, Retention, Cancellations, and Methodology.",
      "Section-specific filters and searchable tables.",
      "Light and dark themes.",
      "Fullscreen mode.",
      "Data export controls.",
      "Visible metric definitions and validation results.",
    ],
    keyFindings: [
      "Net product revenue: 9.77 million across the observation period.",
      "The United Kingdom contributed 84.75% of net product revenue.",
      "Repeat purchasers represented 65.27% of purchasing customers and generated 93.52% of their net revenue.",
      "Champions represented 29.82% of RFM-scored customers and contributed 74.89% of scored customers’ net revenue.",
      "Weighted next-calendar-month retention was 19.73% for January–October 2011 cohorts.",
      "Excluding the two matched reversal pairs reduced cancellation value as a share of gross product revenue from 4.64% to 2.30%, with net revenue unchanged.",
    ],
    result:
      "Delivered an interactive dashboard that brings revenue, markets, products, customer segments, retention, cancellations, and methodology into one explorable interface.",
  },
  {
    title: "Covid-19 Data Exploration with SQL",
    tags: ["SQL Server", "Window Functions", "CTEs"],
    githubUrl: "https://github.com/talalelkardosi/SQL-Project",
    problem: "A real-world Covid-19 dataset (cases, deaths, vaccinations) needed structured analysis across countries and continents.",
    approach: "Calculated infection and death rates relative to population, compared countries and continents, joined the deaths and vaccinations tables, and used window functions for a rolling count of vaccinated people over time. Organized the logic with CTEs, temp tables, and views to keep it clean and reusable.",
    result: "Reusable analytical SQL that goes beyond basic SELECT statements: joins, aggregations, window functions, and structured query design.",
  },
  {
    title: "Nashville Housing: Data Cleaning",
    tags: ["Python", "pandas", "NumPy"],
    githubUrl: "https://github.com/talalelkardosi/Nashville-Housing-Data-Cleaning",
    problem: "A raw property-transactions dataset of 56,477 records with duplicates, missing addresses, and inconsistent categories.",
    approach: "Standardized text, removed duplicates, filled missing addresses using ParcelID only when it had one clear address, unified LandUse and SoldAsVacant values, fixed spacing and column names, and converted 4 columns to nullable integers. Kept missing values that lacked enough evidence to fill, and flagged outliers and cases needing review instead of deleting them. Added validation checks to confirm the original values were preserved.",
    result: "56,374 clean records, 103 duplicates removed, 29 missing addresses recovered, 1,557 LandUse values corrected, 451 SoldAsVacant values standardized to Yes/No, plus 10 added data-quality columns for review.",
  },
  {
    title: "Nashville Housing: Exploratory Data Analysis",
    tags: ["Python", "EDA", "Data Visualization"],
    githubUrl: "https://github.com/talalelkardosi/Nashville--Housing-EDA",
    reportUrl: "", // fill in to show "View Report"
    problem: "Understand what drives property sale prices and how the market moved between January 2013 and October 2016.",
    approach: "Compared sale prices by city and property type, studied their relationship with bedrooms, bathrooms, land area, and property age, and analyzed time trends. Used medians and within-segment comparisons, and reviewed the effect of missing data and possible multi-parcel transactions.",
    result: "Findings and their limitations documented in a clear PDF report.",
  },
  {
    title: "Nashville Housing Market Dashboard",
    tags: ["Interactive Dashboard", "KPIs", "Cross-filtering", "HTML/JavaScript"],
    githubUrl: "https://github.com/talalelkardosi/Nashville-Housing-Dashboard", // "" hides GitHub badge + button
    dashboardUrl: "https://talalelkardosi.github.io/Nashville-Housing-Dashboard/", // "" hides "Live" badge + "View Live Dashboard" button
    dashboardSummary: "Filters · Cross-filtering · 6 charts · Median price or sales volume",
    screenshot: "", // fill in to show a screenshot in the modal
    tool: "", // optional extra tag
    problem: "Sale-price results across Nashville (January 2013 to October 2016) were hard for non-technical users to explore, and it was unclear how much the findings change depending on which records are included.",
    approach: "Built an interactive dashboard on the cleaned Nashville Housing dataset. Prices use medians everywhere, with no outlier deletion and no filling of missing values, and any group with fewer than 30 records is hidden. Year-over-year comparisons always use the same January to October window. Possible multi-parcel sales are excluded by default, with a toggle to bring them back. Features: filters for year, land use, city, and multi-parcel inclusion plus a reset; cross-filtering by clicking any bar or heatmap cell; a switch between median price and sales volume; 4 animated KPI cards; and an insight sentence that updates with every filter. Six charts: monthly trend with a Q1-Q3 band, January-October median per year, a city x year heatmap, and medians by land use, by city, and by number of bedrooms.",
    result: "A fast, explorable view where users compare segments and spot patterns in seconds. Prices are nominal transaction medians (descriptive only, not inflation-adjusted, no causal or investment claims).",
  },
];

export const skills: {
  title: string;
  description: string;
  icon: "code" | "database" | "chart" | "validation";
  primaryTools?: string[];
  supportingSkills: string[];
}[] = [
  {
    title: "Python & Data Preparation",
    description: "Prepare, transform, and explore datasets with Python.",
    icon: "code",
    primaryTools: ["Python", "Pandas", "NumPy"],
    supportingSkills: [
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Jupyter Notebook",
      "Web Scraping",
      "Data Cleaning Scripts",
    ],
  },
  {
    title: "SQL & Databases",
    description: "Query, combine, and summarize data to answer analytical questions.",
    icon: "database",
    primaryTools: ["SQL Server"],
    supportingSkills: [
      "Joins",
      "Aggregations",
      "Subqueries",
      "CTEs",
      "Window Functions",
      "Views",
      "Temp Tables",
      "Query Optimization Basics",
    ],
  },
  {
    title: "BI & Visualization",
    description: "Turn analysis into interactive dashboards and clear visual stories.",
    icon: "chart",
    primaryTools: ["Power BI", "Tableau", "Excel"],
    supportingSkills: [
      "DAX Basics",
      "Power Query",
      "Pivot Tables",
      "KPI Analysis",
      "Dashboard Design",
      "Data Storytelling",
    ],
  },
  {
    title: "Data Quality & Analysis",
    description: "Assess data quality, investigate patterns, and document analytical limitations.",
    icon: "validation",
    supportingSkills: [
      "Exploratory Data Analysis (EDA)",
      "Data Cleaning",
      "Data Validation",
      "Missing Data Handling",
      "Outlier Detection",
      "Duplicate Handling",
      "Correlation Analysis",
      "Statistical Analysis",
      "Data Profiling",
    ],
  },
];

export const workflowSkills = {
  description: "Organize code, document decisions, and keep analysis reproducible.",
  items: [
    "Git",
    "GitHub",
    "VS Code",
    "Data Warehousing",
    "Documentation",
    "Reproducible Analysis",
  ],
};

export const credentials: {
  provider: string;
  title: string;
  detail: string;
  duration?: string;
  issued?: string;
  tools?: string[];
  components?: { title: string; duration: string; detail: string }[];
  credentialUrl?: string;
}[] = [
  {
    provider: "Instant",
    title: "Data Analysis Program",
    duration: "150 Hours",
    detail:
      "An intensive 150-hour training program covering Python, web scraping, SQL, Excel, Power BI, and Tableau, with a focus on developing practical data analysis skills.",
    tools: ["Python", "Web Scraping", "SQL", "Excel", "Power BI", "Tableau"],
  },
  {
    provider: "Digital Egypt Pioneers Initiative (DEPI)",
    title: "Professional Data Analysis Track",
    duration: "250+ Hours",
    detail:
      "An extensive data analysis training program combining in-depth technical study with professional communication, soft skills, and prompt engineering.",
    components: [
      {
        title: "Advanced Technical Training",
        duration: "200+ Hours",
        detail:
          "In-depth study of Python, SQL, Tableau, and Power BI, covering advanced topics across all four tools.",
      },
      {
        title: "Soft Skills",
        duration: "18 Hours",
        detail: "Professional soft skills development.",
      },
      {
        title: "Track-Specific English",
        duration: "18 Hours",
        detail: "English language training tailored to the data analysis track.",
      },
      {
        title: "Prompt Engineering",
        duration: "18 Hours",
        detail: "Training in prompt engineering.",
      },
    ],
  },
  {
    provider: "IBM SkillsBuild",
    title: "IBM Data Fundamentals",
    detail: "Covers data analytics concepts, the data analysis process, cleaning and refining data, and visualizing data with IBM Watson Studio.",
    issued: "Issued August 2026",
    credentialUrl: "", // paste the Verify link from the IBM badge page here
  },
];

export type ContactKind = "email" | "phone" | "whatsapp" | "linkedin" | "github" | "mostaql" | "khamsat";
export const email = "talalboombeash@gmail.com";
// Mostaql / Khamsat: fill in `url` to show those cards.
export const contacts: { kind: ContactKind; label: string; value: string; url: string; copy?: string }[] = [
  { kind: "email", label: "Email", value: "talalboombeash@gmail.com", url: "mailto:talalboombeash@gmail.com", copy: "talalboombeash@gmail.com" },
  { kind: "phone", label: "Phone", value: "+20 112 323 5626", url: "tel:+201123235626", copy: "+201123235626" },
  { kind: "whatsapp", label: "WhatsApp", value: "Message on WhatsApp", url: "https://wa.me/201123235626" },
  { kind: "linkedin", label: "LinkedIn", value: "Talal Al Kardousi", url: "https://www.linkedin.com/in/talal-al-kardousi-4b48882b5/" },
  { kind: "github", label: "GitHub", value: "talalelkardosi", url: "https://github.com/talalelkardosi" },
  { kind: "mostaql", label: "Mostaql", value: "Hire me on Mostaql", url: "" },
  { kind: "khamsat", label: "Khamsat", value: "Hire me on Khamsat", url: "" },
];

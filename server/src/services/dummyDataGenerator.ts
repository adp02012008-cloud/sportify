/**
 * SoundWave Realistic Dummy User Analytics & Churn Dataset Generator
 * Generates 50–100 realistic fictional user records with consistent behavioral,
 * engagement, subscription, complaint, payment, and churn prediction metrics.
 */

export interface DummyAnalyticsUser {
  // User Information
  customer_id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Non-Binary';
  city: string;
  country: string;
  signup_date: string;
  account_age_months: number;

  // Subscription Information
  plan: 'Free' | 'Premium' | 'Family' | 'Student';
  subscription_status: 'Active' | 'Cancelled' | 'Expired' | 'Trial';
  subscription_start_date: string;
  subscription_end_date: string;
  monthly_bill: number;
  payment_method: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Wallet' | 'None';
  auto_renew: 'Yes' | 'No';

  // Website Usage
  login_frequency: number;
  monthly_active_days: number;
  sessions_per_month: number;
  avg_session_minutes: number;
  monthly_usage_hours: number;
  total_listening_hours: number;

  // Music Activity
  songs_played_monthly: number;
  songs_completed_monthly: number;
  songs_skipped_monthly: number;
  favorite_genre: string;
  favorite_artist: string;
  playlists_created: number;
  playlists_followed: number;
  liked_songs_count: number;
  albums_saved: number;
  artists_followed: number;

  // Search & Discovery Behaviour
  searches_per_month: number;
  artists_viewed: number;
  albums_viewed: number;
  playlist_views: number;
  recommendation_clicks: number;
  discovery_sessions: number;

  // Playlist Behaviour
  songs_added_to_playlists: number;
  collaborative_playlists: number;
  public_playlists: number;
  playlist_shares: number;

  // Social Behaviour
  users_followed: number;
  followers_count: number;
  songs_shared: number;
  playlists_shared: number;
  social_interactions: number;

  // Podcast & Audiobook Usage
  podcast_episodes_played: number;
  podcast_listening_hours: number;
  podcasts_followed: number;
  audiobooks_started: number;
  audiobook_listening_hours: number;

  // Engagement Metrics
  engagement_score: number;
  satisfaction_score: number;
  activity_score: number;
  loyalty_score: number;

  // Usage Change (vs previous month %)
  usage_change_pct: number;
  listening_change_pct: number;
  login_change_pct: number;

  // Customer Support / Complaints
  complaint_count: number;
  open_complaints: number;
  avg_resolution_days: number;
  last_complaint_days_ago: number;
  support_tickets: number;

  // Payment Behaviour
  payment_delay_days: number;
  payment_failures: number;
  late_payments: number;
  refund_requests: number;
  payment_issue_count: number;

  // Plan Change Behaviour
  plan_changes: number;
  upgrades: number;
  downgrades: number;
  last_plan_change_days_ago: number;

  // User Experience
  app_rating: number;
  favorite_feature: string;
  most_used_device: 'Mobile' | 'Desktop' | 'Tablet' | 'Web';

  // Device & Access Data
  primary_device: 'Mobile' | 'Desktop' | 'Tablet' | 'Web';
  device_count: number;
  mobile_usage_pct: number;
  desktop_usage_pct: number;
  tablet_usage_pct: number;

  // Security / Account Activity
  last_login_days_ago: number;
  login_failures: number;
  account_warnings: number;

  // Churn Prediction Data
  user_segment:
    | 'Power User'
    | 'Regular User'
    | 'Casual User'
    | 'New User'
    | 'At Risk'
    | 'Churned User'
    | 'Podcast Listener'
    | 'Audiobook Listener'
    | 'Free User'
    | 'Premium Loyal User';
  churn_risk: 'Low' | 'Medium' | 'High';
  churn: 0 | 1;
}

// Seed Fictional Name Pools
const FIRST_NAMES_MALE = [
  'Arun', 'Rohan', 'Vikram', 'Aditya', 'Siddharth', 'Karthik', 'Nikhil', 'Dev',
  'Anand', 'Rahul', 'Farhan', 'Kabir', 'Pranav', 'Reyansh', 'Aarav', 'Sameer',
  'Tariq', 'Rishi', 'Zayn', 'Manish', 'Harish', 'Gaurav', 'Dhruv', 'Yash', 'Neil'
];

const FIRST_NAMES_FEMALE = [
  'Priya', 'Ananya', 'Meera', 'Sneha', 'Deepika', 'Tanvi', 'Ishita', 'Rhea',
  'Kavya', 'Divya', 'Ayesha', 'Zara', 'Pooja', 'Shreya', 'Nandini', 'Tara',
  'Anjali', 'Simran', 'Kriti', 'Bhavna', 'Neha', 'Maya', 'Dia', 'Sanya', 'Lavanya'
];

const LAST_NAMES = [
  'Kumar', 'Sharma', 'Patel', 'Iyer', 'Reddy', 'Chatterjee', 'Mehta', 'Verma',
  'Nair', 'Deshmukh', 'Menon', 'Joshi', 'Bose', 'Singhania', 'Kapoor', 'Chopra',
  'Bhatia', 'Malhotra', 'Sengupta', 'Pillai', 'Rao', 'Venkatesh', 'Kulkarni', 'Naik'
];

const CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata',
  'Ahmedabad', 'Kochi', 'Jaipur', 'Chandigarh', 'Indore', 'Lucknow', 'Goa'
];

const GENRES = [
  'Synthwave', 'Lo-Fi Chill', 'Electronic', 'Cyberpunk Bass', 'Deep House',
  'Chillstep', 'Ambient Space', 'Indie Rock', 'Pop Melodic', 'Acoustic Folk'
];

const ARTISTS = [
  'CyberPulse', 'Neon Mirage', 'Aetheria', 'Lunar Echoes', 'The Midnight Walkers',
  'Solaris Project', 'Velvet Dusk', 'Prism Horizon', 'RetroWave Orchestra', 'Kavita Sundaram'
];

const FEATURES = [
  'Music Streaming', 'Playlists', 'Recommendations', 'Podcasts', 'Audiobooks', 'Social', 'Search'
];

// Helper Random Range Generator
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat = (min: number, max: number, decimals: number = 1): number => {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
};

const randomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Generates a full dataset of realistic dummy users
 * @param count Count between 50 and 100 (defaults to 100)
 */
export const generateDummyUsers = (count: number = 100): DummyAnalyticsUser[] => {
  const safeCount = Math.max(50, Math.min(100, Math.round(count)));
  const users: DummyAnalyticsUser[] = [];

  // Define archetype distributions for 100 users
  // Segment archetypes guide realistic parameter ranges
  const archetypes: Array<DummyAnalyticsUser['user_segment']> = [
    'Power User',
    'Premium Loyal User',
    'Regular User',
    'Free User',
    'Podcast Listener',
    'Audiobook Listener',
    'Casual User',
    'New User',
    'At Risk',
    'Churned User'
  ];

  for (let i = 0; i < safeCount; i++) {
    const customer_id = `C${1001 + i}`;

    // Gender & Name
    const isMale = Math.random() > 0.48;
    const isNonBinary = Math.random() < 0.05;
    const gender: DummyAnalyticsUser['gender'] = isNonBinary
      ? 'Non-Binary'
      : isMale
      ? 'Male'
      : 'Female';

    const firstName = isNonBinary
      ? randomItem(['Alex', 'Sam', 'Taylor', 'Jordan', 'Morgan'])
      : isMale
      ? randomItem(FIRST_NAMES_MALE)
      : randomItem(FIRST_NAMES_FEMALE);
    const lastName = randomItem(LAST_NAMES);
    const name = `${firstName} ${lastName}`;

    const age = randomBetween(18, 52);
    const city = randomItem(CITIES);
    const country = 'India';

    // Account Age & Dates
    const account_age_months = randomBetween(1, 36);
    const now = new Date();
    const signupDateObj = new Date(now.getTime() - account_age_months * 30 * 24 * 60 * 60 * 1000);
    const signup_date = signupDateObj.toISOString().split('T')[0];

    // Assign Segment with realistic weighted probability
    let segment: DummyAnalyticsUser['user_segment'];
    const r = Math.random();
    if (i < 15) segment = 'Power User';
    else if (i < 30) segment = 'Premium Loyal User';
    else if (i < 48) segment = 'Regular User';
    else if (i < 65) segment = 'Free User';
    else if (i < 73) segment = 'Podcast Listener';
    else if (i < 80) segment = 'Audiobook Listener';
    else if (i < 88) segment = 'Casual User';
    else if (i < 93) segment = 'New User';
    else if (i < 97) segment = 'At Risk';
    else segment = 'Churned User';

    // Plan distribution based on segment
    let plan: DummyAnalyticsUser['plan'] = 'Free';
    let subscription_status: DummyAnalyticsUser['subscription_status'] = 'Active';
    let monthly_bill = 0;
    let payment_method: DummyAnalyticsUser['payment_method'] = 'None';
    let auto_renew: DummyAnalyticsUser['auto_renew'] = 'No';

    if (segment === 'Power User' || segment === 'Premium Loyal User') {
      plan = Math.random() > 0.25 ? 'Premium' : 'Family';
      subscription_status = 'Active';
      monthly_bill = plan === 'Family' ? 179 : 119;
      payment_method = randomItem(['UPI', 'Credit Card', 'Debit Card', 'Net Banking']);
      auto_renew = 'Yes';
    } else if (segment === 'Churned User') {
      plan = randomItem(['Free', 'Premium', 'Student']);
      subscription_status = randomItem(['Cancelled', 'Expired']);
      monthly_bill = 0;
      payment_method = randomItem(['UPI', 'Credit Card', 'Wallet']);
      auto_renew = 'No';
    } else if (segment === 'At Risk') {
      plan = randomItem(['Premium', 'Student', 'Free']);
      subscription_status = plan === 'Free' ? 'Active' : randomItem(['Active', 'Cancelled']);
      monthly_bill = plan === 'Premium' ? 119 : plan === 'Student' ? 59 : 0;
      payment_method = plan === 'Free' ? 'None' : randomItem(['UPI', 'Debit Card', 'Wallet']);
      auto_renew = plan === 'Free' ? 'No' : Math.random() > 0.5 ? 'Yes' : 'No';
    } else if (segment === 'New User') {
      plan = Math.random() > 0.4 ? 'Free' : 'Student';
      subscription_status = Math.random() > 0.3 ? 'Trial' : 'Active';
      monthly_bill = plan === 'Student' ? 59 : 0;
      payment_method = plan === 'Free' ? 'None' : 'UPI';
      auto_renew = plan === 'Free' ? 'No' : 'Yes';
    } else if (segment === 'Free User') {
      plan = 'Free';
      subscription_status = 'Active';
      monthly_bill = 0;
      payment_method = 'None';
      auto_renew = 'No';
    } else {
      // Regular / Podcast / Audiobook
      const planRoll = Math.random();
      if (planRoll < 0.4) {
        plan = 'Free';
        monthly_bill = 0;
        payment_method = 'None';
        auto_renew = 'No';
      } else if (planRoll < 0.8) {
        plan = 'Premium';
        monthly_bill = 119;
        payment_method = randomItem(['UPI', 'Credit Card', 'Debit Card']);
        auto_renew = 'Yes';
      } else {
        plan = 'Student';
        monthly_bill = 59;
        payment_method = 'UPI';
        auto_renew = 'Yes';
      }
      subscription_status = 'Active';
    }

    const subStartObj = new Date(now.getTime() - randomBetween(5, 300) * 24 * 60 * 60 * 1000);
    const subEndObj = new Date(subStartObj.getTime() + 30 * 24 * 60 * 60 * 1000);
    const subscription_start_date = subStartObj.toISOString().split('T')[0];
    const subscription_end_date = subEndObj.toISOString().split('T')[0];

    // Behavior Variables tuned by Segment
    let login_frequency: number;
    let monthly_active_days: number;
    let sessions_per_month: number;
    let avg_session_minutes: number;
    let songs_played_monthly: number;
    let songs_completed_monthly: number;
    let songs_skipped_monthly: number;
    let podcast_episodes_played: number = 0;
    let podcast_listening_hours: number = 0;
    let audiobooks_started: number = 0;
    let audiobook_listening_hours: number = 0;

    let searches_per_month: number;
    let playlists_created: number;
    let liked_songs_count: number;
    let artists_followed: number;
    let last_login_days_ago: number;
    let usage_change_pct: number;
    let complaint_count: number = 0;
    let open_complaints: number = 0;
    let payment_failures: number = 0;
    let payment_delay_days: number = 0;
    let downgrades: number = 0;

    if (segment === 'Power User' || segment === 'Premium Loyal User') {
      login_frequency = randomBetween(25, 30);
      monthly_active_days = randomBetween(24, 30);
      sessions_per_month = randomBetween(45, 95);
      avg_session_minutes = randomBetween(40, 75);
      songs_played_monthly = randomBetween(350, 950);
      songs_skipped_monthly = randomBetween(20, 60);
      songs_completed_monthly = songs_played_monthly - songs_skipped_monthly;
      searches_per_month = randomBetween(40, 110);
      playlists_created = randomBetween(4, 18);
      liked_songs_count = randomBetween(120, 480);
      artists_followed = randomBetween(15, 45);
      last_login_days_ago = randomBetween(0, 2);
      usage_change_pct = randomBetween(5, 45);
      complaint_count = Math.random() < 0.2 ? 1 : 0;
    } else if (segment === 'At Risk' || segment === 'Churned User') {
      login_frequency = randomBetween(1, 8);
      monthly_active_days = randomBetween(1, 7);
      sessions_per_month = randomBetween(2, 12);
      avg_session_minutes = randomBetween(10, 25);
      songs_played_monthly = randomBetween(15, 70);
      songs_skipped_monthly = randomBetween(15, 35);
      songs_completed_monthly = Math.max(0, songs_played_monthly - songs_skipped_monthly);
      searches_per_month = randomBetween(1, 10);
      playlists_created = randomBetween(0, 1);
      liked_songs_count = randomBetween(5, 30);
      artists_followed = randomBetween(1, 6);
      last_login_days_ago = segment === 'Churned User' ? randomBetween(20, 65) : randomBetween(7, 24);
      usage_change_pct = randomBetween(-65, -18);
      complaint_count = randomBetween(2, 6);
      open_complaints = randomBetween(1, 3);
      payment_failures = plan !== 'Free' ? randomBetween(1, 4) : 0;
      payment_delay_days = plan !== 'Free' ? randomBetween(3, 14) : 0;
      downgrades = Math.random() > 0.5 ? 1 : 0;
    } else if (segment === 'Podcast Listener') {
      login_frequency = randomBetween(16, 26);
      monthly_active_days = randomBetween(15, 25);
      sessions_per_month = randomBetween(25, 55);
      avg_session_minutes = randomBetween(35, 60);
      songs_played_monthly = randomBetween(40, 140);
      songs_skipped_monthly = randomBetween(5, 20);
      songs_completed_monthly = songs_played_monthly - songs_skipped_monthly;
      podcast_episodes_played = randomBetween(18, 48);
      podcast_listening_hours = randomFloat(12.0, 36.0, 1);
      searches_per_month = randomBetween(15, 40);
      playlists_created = randomBetween(1, 4);
      liked_songs_count = randomBetween(20, 70);
      artists_followed = randomBetween(4, 12);
      last_login_days_ago = randomBetween(0, 4);
      usage_change_pct = randomBetween(-5, 25);
    } else if (segment === 'Audiobook Listener') {
      login_frequency = randomBetween(14, 24);
      monthly_active_days = randomBetween(14, 22);
      sessions_per_month = randomBetween(20, 45);
      avg_session_minutes = randomBetween(40, 75);
      songs_played_monthly = randomBetween(30, 90);
      songs_skipped_monthly = randomBetween(4, 15);
      songs_completed_monthly = songs_played_monthly - songs_skipped_monthly;
      audiobooks_started = randomBetween(2, 6);
      audiobook_listening_hours = randomFloat(15.0, 42.0, 1);
      searches_per_month = randomBetween(10, 30);
      playlists_created = randomBetween(0, 2);
      liked_songs_count = randomBetween(10, 50);
      artists_followed = randomBetween(3, 10);
      last_login_days_ago = randomBetween(1, 5);
      usage_change_pct = randomBetween(-10, 20);
    } else {
      // Regular / Casual / Free / New
      login_frequency = segment === 'Casual User' ? randomBetween(5, 14) : randomBetween(12, 22);
      monthly_active_days = Math.min(login_frequency, randomBetween(6, 20));
      sessions_per_month = randomBetween(12, 35);
      avg_session_minutes = randomBetween(20, 45);
      songs_played_monthly = randomBetween(80, 260);
      songs_skipped_monthly = randomBetween(15, 45);
      songs_completed_monthly = songs_played_monthly - songs_skipped_monthly;
      searches_per_month = randomBetween(8, 35);
      playlists_created = randomBetween(1, 5);
      liked_songs_count = randomBetween(25, 110);
      artists_followed = randomBetween(5, 18);
      last_login_days_ago = randomBetween(0, 9);
      usage_change_pct = randomBetween(-15, 25);
      complaint_count = Math.random() < 0.25 ? 1 : 0;
    }

    // Calculated Internal Consistency
    const monthly_usage_hours = parseFloat(
      ((sessions_per_month * avg_session_minutes) / 60 + podcast_listening_hours + audiobook_listening_hours).toFixed(1)
    );
    const total_listening_hours = parseFloat(
      (monthly_usage_hours * Math.max(1, account_age_months * 0.75)).toFixed(1)
    );

    const listening_change_pct = Math.round(usage_change_pct * randomFloat(0.8, 1.2, 2));
    const login_change_pct = Math.round(usage_change_pct * randomFloat(0.7, 1.1, 2));

    // Support Metrics
    const support_tickets = complaint_count + (Math.random() < 0.3 ? 1 : 0);
    const avg_resolution_days = complaint_count > 0 ? randomFloat(1.2, 5.8, 1) : 0;
    const last_complaint_days_ago = complaint_count > 0 ? randomBetween(4, 90) : 0;

    // Discovery & Playlist metrics
    const artists_viewed = Math.round(searches_per_month * randomFloat(0.3, 0.6, 2));
    const albums_viewed = Math.round(searches_per_month * randomFloat(0.2, 0.5, 2));
    const playlist_views = Math.round(sessions_per_month * randomFloat(0.5, 1.4, 2));
    const recommendation_clicks = Math.round(searches_per_month * randomFloat(0.4, 0.85, 2));
    const discovery_sessions = Math.max(1, Math.round(sessions_per_month * 0.35));

    const songs_added_to_playlists = playlists_created * randomBetween(8, 22);
    const collaborative_playlists = Math.floor(playlists_created * 0.25);
    const public_playlists = Math.floor(playlists_created * 0.7);
    const playlist_shares = Math.floor(playlists_created * 0.5);
    const playlists_followed = randomBetween(1, 14);
    const albums_saved = Math.round(liked_songs_count * 0.08);

    // Social metrics
    const users_followed = Math.floor(artists_followed * randomFloat(0.4, 1.5, 1));
    const followers_count = Math.floor(users_followed * randomFloat(0.6, 2.0, 1));
    const songs_shared = Math.floor(recommendation_clicks * 0.2);
    const playlists_shared = playlist_shares;
    const social_interactions = users_followed + songs_shared + playlists_shared;

    // Derived Scores (0–100)
    let rawEngagement =
      (login_frequency / 30) * 30 +
      (Math.min(monthly_usage_hours, 60) / 60) * 35 +
      (Math.min(songs_played_monthly, 500) / 500) * 20 +
      (Math.min(social_interactions, 30) / 30) * 15;
    const engagement_score = Math.max(5, Math.min(99, Math.round(rawEngagement)));

    let rawActivity =
      (monthly_active_days / 30) * 40 +
      (Math.min(sessions_per_month, 60) / 60) * 35 +
      (Math.min(searches_per_month, 50) / 50) * 25;
    const activity_score = Math.max(8, Math.min(98, Math.round(rawActivity)));

    let rawLoyalty =
      (Math.min(account_age_months, 36) / 36) * 45 +
      (engagement_score / 100) * 35 +
      (plan !== 'Free' ? 20 : 5);
    const loyalty_score = Math.max(10, Math.min(99, Math.round(rawLoyalty)));

    // Satisfaction score (1.0 to 5.0) influenced by complaints, payment failures, engagement
    let satisfactionBase = 4.4;
    if (complaint_count > 0) satisfactionBase -= complaint_count * 0.45;
    if (open_complaints > 0) satisfactionBase -= open_complaints * 0.4;
    if (payment_failures > 0) satisfactionBase -= payment_failures * 0.3;
    if (usage_change_pct < -20) satisfactionBase -= 0.5;
    if (segment === 'Power User' || segment === 'Premium Loyal User') satisfactionBase += 0.5;
    const satisfaction_score = parseFloat(
      Math.max(1.2, Math.min(5.0, satisfactionBase + randomFloat(-0.2, 0.2, 1))).toFixed(1)
    );
    const app_rating = Math.max(1, Math.min(5, Math.round(satisfaction_score)));

    const primary_device: DummyAnalyticsUser['primary_device'] = randomItem(['Mobile', 'Desktop', 'Tablet', 'Web'] as const);
    let mobile_usage_pct = 70;
    let desktop_usage_pct = 20;
    let tablet_usage_pct = 10;
    if (primary_device === 'Desktop') {
      desktop_usage_pct = 65;
      mobile_usage_pct = 25;
      tablet_usage_pct = 10;
    } else if (primary_device === 'Web') {
      desktop_usage_pct = 50;
      mobile_usage_pct = 40;
      tablet_usage_pct = 10;
    } else if (primary_device === 'Tablet') {
      tablet_usage_pct = 60;
      mobile_usage_pct = 30;
      desktop_usage_pct = 10;
    }

    // Plan Change history
    const plan_changes = segment === 'At Risk' || segment === 'Churned User' ? randomBetween(1, 3) : randomBetween(0, 2);
    const upgrades = segment === 'Power User' || segment === 'Premium Loyal User' ? randomBetween(1, 2) : 0;
    const last_plan_change_days_ago = plan_changes > 0 ? randomBetween(10, 180) : 0;

    // Churn Risk & Churn Calculation with Realistic Noise for ML
    let churnProbability = 0.05; // Base 5%
    if (segment === 'Churned User') churnProbability = 0.95;
    else if (segment === 'At Risk') churnProbability = 0.78;
    else {
      if (usage_change_pct < -25) churnProbability += 0.3;
      if (last_login_days_ago > 14) churnProbability += 0.25;
      if (engagement_score < 30) churnProbability += 0.22;
      if (satisfaction_score < 2.5) churnProbability += 0.25;
      if (open_complaints > 0) churnProbability += 0.18;
      if (payment_failures > 0) churnProbability += 0.2;
      if (plan !== 'Free' && auto_renew === 'No') churnProbability += 0.15;

      // Offsetting factors
      if (engagement_score > 75) churnProbability -= 0.25;
      if (satisfaction_score >= 4.5) churnProbability -= 0.2;
      if (loyalty_score > 70) churnProbability -= 0.15;
    }

    // Clamp probability
    churnProbability = Math.max(0.02, Math.min(0.98, churnProbability));

    // Assign Churn Risk Label
    let churn_risk: DummyAnalyticsUser['churn_risk'] = 'Low';
    if (churnProbability > 0.6) churn_risk = 'High';
    else if (churnProbability > 0.3) churn_risk = 'Medium';

    // Assign Churn binary outcome (incorporating stochastic noise)
    const churn: 0 | 1 =
      segment === 'Churned User'
        ? 1
        : Math.random() < churnProbability
        ? 1
        : 0;

    users.push({
      customer_id,
      name,
      age,
      gender,
      city,
      country,
      signup_date,
      account_age_months,

      plan,
      subscription_status,
      subscription_start_date,
      subscription_end_date,
      monthly_bill,
      payment_method,
      auto_renew,

      login_frequency,
      monthly_active_days,
      sessions_per_month,
      avg_session_minutes,
      monthly_usage_hours,
      total_listening_hours,

      songs_played_monthly,
      songs_completed_monthly,
      songs_skipped_monthly,
      favorite_genre: randomItem(GENRES),
      favorite_artist: randomItem(ARTISTS),
      playlists_created,
      playlists_followed,
      liked_songs_count,
      albums_saved,
      artists_followed,

      searches_per_month,
      artists_viewed,
      albums_viewed,
      playlist_views,
      recommendation_clicks,
      discovery_sessions,

      songs_added_to_playlists,
      collaborative_playlists,
      public_playlists,
      playlist_shares,

      users_followed,
      followers_count,
      songs_shared,
      playlists_shared,
      social_interactions,

      podcast_episodes_played,
      podcast_listening_hours,
      podcasts_followed: podcast_episodes_played > 0 ? randomBetween(2, 8) : 0,
      audiobooks_started,
      audiobook_listening_hours,

      engagement_score,
      satisfaction_score,
      activity_score,
      loyalty_score,

      usage_change_pct,
      listening_change_pct,
      login_change_pct,

      complaint_count,
      open_complaints,
      avg_resolution_days,
      last_complaint_days_ago,
      support_tickets,

      payment_delay_days,
      payment_failures,
      late_payments: payment_failures > 0 ? randomBetween(1, payment_failures) : 0,
      refund_requests: complaint_count > 2 && Math.random() > 0.6 ? 1 : 0,
      payment_issue_count: payment_failures + (payment_delay_days > 0 ? 1 : 0),

      plan_changes,
      upgrades,
      downgrades,
      last_plan_change_days_ago,

      app_rating,
      favorite_feature: randomItem(FEATURES),
      most_used_device: primary_device,

      primary_device,
      device_count: randomBetween(1, 4),
      mobile_usage_pct,
      desktop_usage_pct,
      tablet_usage_pct,

      last_login_days_ago,
      login_failures: Math.random() < 0.2 ? randomBetween(1, 3) : 0,
      account_warnings: payment_failures > 2 ? 1 : 0,

      user_segment: segment,
      churn_risk,
      churn
    });
  }

  return users;
};

/**
 * Converts a list of dummy users to a clean, standard CSV string
 */
export const convertUsersToCSV = (users: DummyAnalyticsUser[]): string => {
  if (users.length === 0) return '';

  const headers = Object.keys(users[0]);
  const rows = users.map((user) =>
    headers
      .map((header) => {
        const val = (user as any)[header];
        if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val !== undefined && val !== null ? val : '';
      })
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
};

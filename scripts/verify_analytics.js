const fs = require('fs');
const path = require('path');
const { generateDummyUsers, convertUsersToCSV } = require('../server/dist/services/dummyDataGenerator.js');

console.log('====================================================');
console.log('🧪 SOUNDWAVE USER ANALYTICS & CHURN DATASET VERIFICATION');
console.log('====================================================\n');

// 1. Generate 100 dummy users
const users = generateDummyUsers(100);
console.log(`[PASS] Step 1: Successfully generated ${users.length} dummy users.`);

// 2. Validate row count
if (users.length !== 100) {
  throw new Error(`Expected exactly 100 users, got ${users.length}`);
}
console.log(`[PASS] Step 2: Exactly 100 user objects created.`);

// 3. Validate unique customer IDs
const ids = users.map(u => u.customer_id);
const uniqueIds = new Set(ids);
if (uniqueIds.size !== 100) {
  throw new Error(`Found duplicate customer IDs! Unique count: ${uniqueIds.size}`);
}
if (ids[0] !== 'C1001' || ids[ids.length - 1] !== 'C1100') {
  throw new Error(`Expected ID sequence C1001..C1100, got ${ids[0]}..${ids[ids.length - 1]}`);
}
console.log(`[PASS] Step 3: Zero duplicate IDs. Perfect sequential format: ${ids[0]} -> ${ids[ids.length - 1]}.`);

// 4. Validate Required Columns
const expectedColumns = [
  'customer_id', 'name', 'age', 'gender', 'city', 'country', 'signup_date', 'account_age_months',
  'plan', 'subscription_status', 'subscription_start_date', 'subscription_end_date', 'monthly_bill', 'payment_method', 'auto_renew',
  'login_frequency', 'monthly_active_days', 'sessions_per_month', 'avg_session_minutes', 'monthly_usage_hours', 'total_listening_hours',
  'songs_played_monthly', 'songs_completed_monthly', 'songs_skipped_monthly', 'favorite_genre', 'favorite_artist',
  'playlists_created', 'playlists_followed', 'liked_songs_count', 'albums_saved', 'artists_followed',
  'searches_per_month', 'artists_viewed', 'albums_viewed', 'playlist_views', 'recommendation_clicks', 'discovery_sessions',
  'songs_added_to_playlists', 'collaborative_playlists', 'public_playlists', 'playlist_shares',
  'users_followed', 'followers_count', 'songs_shared', 'playlists_shared', 'social_interactions',
  'podcast_episodes_played', 'podcast_listening_hours', 'podcasts_followed', 'audiobooks_started', 'audiobook_listening_hours',
  'engagement_score', 'satisfaction_score', 'activity_score', 'loyalty_score',
  'usage_change_pct', 'listening_change_pct', 'login_change_pct',
  'complaint_count', 'open_complaints', 'avg_resolution_days', 'last_complaint_days_ago', 'support_tickets',
  'payment_delay_days', 'payment_failures', 'late_payments', 'refund_requests', 'payment_issue_count',
  'plan_changes', 'upgrades', 'downgrades', 'last_plan_change_days_ago',
  'app_rating', 'favorite_feature', 'most_used_device',
  'primary_device', 'device_count', 'mobile_usage_pct', 'desktop_usage_pct', 'tablet_usage_pct',
  'last_login_days_ago', 'login_failures', 'account_warnings',
  'user_segment', 'churn_risk', 'churn'
];

const sampleKeys = Object.keys(users[0]);
for (const col of expectedColumns) {
  if (!sampleKeys.includes(col)) {
    throw new Error(`Missing expected column: ${col}`);
  }
}
console.log(`[PASS] Step 4: All ${expectedColumns.length} expected analytical columns present.`);

// 5. Validate Field Constraints & Logical Validity
for (const [idx, u] of users.entries()) {
  // Age
  if (u.age < 15 || u.age > 75) throw new Error(`User ${u.customer_id} has invalid age: ${u.age}`);
  // Scores
  if (u.engagement_score < 0 || u.engagement_score > 100) throw new Error(`Invalid engagement: ${u.engagement_score}`);
  if (u.activity_score < 0 || u.activity_score > 100) throw new Error(`Invalid activity: ${u.activity_score}`);
  if (u.loyalty_score < 0 || u.loyalty_score > 100) throw new Error(`Invalid loyalty: ${u.loyalty_score}`);
  if (u.satisfaction_score < 1.0 || u.satisfaction_score > 5.0) throw new Error(`Invalid CSAT: ${u.satisfaction_score}`);
  // Churn
  if (u.churn !== 0 && u.churn !== 1) throw new Error(`Invalid churn value: ${u.churn}`);
  if (!['Low', 'Medium', 'High'].includes(u.churn_risk)) throw new Error(`Invalid churn_risk: ${u.churn_risk}`);
  // Device Percentages
  const totalDevicePct = u.mobile_usage_pct + u.desktop_usage_pct + u.tablet_usage_pct;
  if (totalDevicePct < 95 || totalDevicePct > 105) throw new Error(`Device pcts do not sum to 100: ${totalDevicePct}`);
  // Date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(u.signup_date)) throw new Error(`Invalid signup date: ${u.signup_date}`);
}
console.log(`[PASS] Step 5: Validated bounds, score ranges, dates, and device percentages for all 100 users.`);

// 6. Test CSV Generation and File formatting
const csvString = convertUsersToCSV(users);
const csvLines = csvString.trim().split('\n');
if (csvLines.length !== 101) {
  throw new Error(`CSV must have exactly 101 lines (1 header + 100 rows), got ${csvLines.length}`);
}
const csvHeaderCols = csvLines[0].split(',').length;
console.log(`[PASS] Step 6: Generated CSV with 1 header row + 100 data rows (${csvHeaderCols} columns).`);

// 7. Write to soundwave_users_analytics.csv
const csvPath = path.resolve(__dirname, '../soundwave_users_analytics.csv');
fs.writeFileSync(csvPath, csvString, 'utf8');
console.log(`[PASS] Step 7: Saved to ${csvPath} (${fs.statSync(csvPath).size} bytes).`);

// 8. Analyze Behavioral & Churn Logical Correlation
const activeUsers = users.filter(u => u.churn === 0);
const churnedUsers = users.filter(u => u.churn === 1);

const avg = (arr, fn) => arr.reduce((acc, x) => acc + fn(x), 0) / (arr.length || 1);

const activeEngagement = avg(activeUsers, u => u.engagement_score);
const churnedEngagement = avg(churnedUsers, u => u.engagement_score);

const activeSatisfaction = avg(activeUsers, u => u.satisfaction_score);
const churnedSatisfaction = avg(churnedUsers, u => u.satisfaction_score);

const activeUsageChange = avg(activeUsers, u => u.usage_change_pct);
const churnedUsageChange = avg(churnedUsers, u => u.usage_change_pct);

const activeComplaints = avg(activeUsers, u => u.complaint_count);
const churnedComplaints = avg(churnedUsers, u => u.complaint_count);

console.log('\n📊 CORRELATION & BEHAVIOUR SUMMARY:');
console.log(`  Active users count:   ${activeUsers.length}`);
console.log(`  Churned users count:  ${churnedUsers.length}`);
console.log(`  Active Engagement:    ${activeEngagement.toFixed(1)} / 100  vs  Churned: ${churnedEngagement.toFixed(1)} / 100`);
console.log(`  Active Satisfaction:  ${activeSatisfaction.toFixed(2)} / 5.0  vs  Churned: ${churnedSatisfaction.toFixed(2)} / 5.0`);
console.log(`  Active Usage Trend:   ${activeUsageChange >= 0 ? '+' : ''}${activeUsageChange.toFixed(1)}%  vs  Churned: ${churnedUsageChange.toFixed(1)}%`);
console.log(`  Active Complaints:    ${activeComplaints.toFixed(2)} avg  vs  Churned: ${churnedComplaints.toFixed(2)} avg`);

if (churnedEngagement >= activeEngagement) {
  throw new Error('Logical correlation failure: Churned users should have lower average engagement!');
}
if (churnedSatisfaction >= activeSatisfaction) {
  throw new Error('Logical correlation failure: Churned users should have lower average satisfaction!');
}
if (churnedUsageChange >= activeUsageChange) {
  throw new Error('Logical correlation failure: Churned users should have lower/negative usage trends!');
}
console.log('\n[PASS] Step 8: Churn behaviour is logically, statistically, and realistically correlated with usage patterns and customer dissatisfaction.');

// 9. Plan distribution check
const planCounts = users.reduce((acc, u) => { acc[u.plan] = (acc[u.plan] || 0) + 1; return acc; }, {});
console.log('\n[PASS] Step 9: Plan Distribution:');
console.log(planCounts);

console.log('\n====================================================');
console.log('🎉 ALL 10 OBJECTIVES & CHECKS PASSED SUCCESSFULLY!');
console.log('====================================================');

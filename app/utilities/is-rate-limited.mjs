function isRateLimited(userId, userRequests) {
  const now = Date.now();
  const interval = 1000 * 60; // 1 minute interval
  const requests = userRequests[userId] || [];
  const recentRequests = requests.filter(timestamp => now - timestamp < interval);
  if (recentRequests.length >= 10) {
    return true;
  }
  userRequests[userId] = [...recentRequests, now];
  return false;
}

export { isRateLimited }
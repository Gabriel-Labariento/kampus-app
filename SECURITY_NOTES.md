# Security Notes

## CodeQL Findings

During the performance optimization review, CodeQL identified the following security considerations:

### Missing Rate Limiting

**Issue**: API endpoints that perform database access are not rate-limited.

**Affected Routes**:
- `GET /api/listings` (line 42)
- `DELETE /api/listings/:itemId` (line 90)

**Recommendation**: 
Implement rate limiting using a package like `express-rate-limit` to protect against:
- Denial of Service (DoS) attacks
- Brute force attempts
- Excessive API usage

**Example Implementation**:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to all routes
app.use('/api/', limiter);
```

**Status**: Not implemented in this PR as it's beyond the scope of performance optimization. This should be addressed in a separate security-focused PR.

## Other Security Considerations

All other security best practices remain in place:
- Student email verification via Clerk
- CORS configuration limiting allowed origins
- Input validation on schema level via Mongoose
- No direct exposure of database IDs or sensitive data

# ExploreX Security Policy & OWASP Top 10 Controls

ExploreX is a production-grade digital platform for Sri Lankan tourism and private chauffeur tour dispatching. Security, confidentiality, and data minimization are core architectural principles of this codebase.

---

## 1. Vulnerability Reporting Policy
If you discover a security vulnerability within ExploreX, please do not open a public issue. Email our security team directly:
- **Security Contact**: `security@explorex.lk`
- **Response SLA**: Initial triage within 24 hours; remediation plan within 72 hours.
- **Responsible Disclosure**: We commit to resolving verified issues before public release.

---

## 2. OWASP Top 10 (2021/2026) Defenses & Architecture Matrix

| OWASP Category | Vulnerability Risk | ExploreX Defense Mechanism | Verification Status |
| :--- | :--- | :--- | :--- |
| **A01: Broken Access Control** | Unauthorized access to admin endpoints or other tenants' data | Multi-layer RBAC (`SUPER_ADMIN`, `MANAGER`, `CONTENT_EDITOR`, `SUPPORT_AGENT`, `CUSTOMER`). Server-side `assertPermission()` on all API routes. Row-level data isolation for customers. | Enforced & Tested |
| **A02: Cryptographic Failures** | Data in transit/at rest intercepted or weak password hashing | HTTPS/HSTS (1 year `max-age=31536000; includeSubDomains; preload`). Password hashing with `bcryptjs` (salt rounds: 12). Sensitive session tokens stored in `HttpOnly; SameSite=Strict; Secure` cookies. Secrets stored strictly in environment variables. | Enforced |
| **A03: Injection** | SQL, NoSQL, OS command injection | ORM / parameterized repository layer (`src/lib/db.ts` & Prisma). Zod schema input validation and type sanitization before data operations. No raw dynamic query string concatenation. | Enforced & Tested |
| **A04: Insecure Design** | Unprotected business flows & account takeover | Sliding window rate limiting on authentication and booking APIs (`src/lib/rate-limit.ts`). Account lockout after 5 consecutive failed login attempts (15-minute cooldown). Zero credit card storage policy — transactions are finalized directly via verified WhatsApp concierges. | Enforced |
| **A05: Security Misconfiguration** | Missing HTTP headers, default credentials, verbose stack traces | Next.js custom response headers configured in `next.config.ts`: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. Development logs stripped in production. | Enforced |
| **A06: Vulnerable & Outdated Components** | Compromised npm dependencies | Managed package audits (`npm audit`). Minimal runtime footprint. Dependabot automated vulnerability scanning enabled. | Verified clean |
| **A07: Identification & Authentication Failures** | Credential stuffing, brute force, session hijacking | Short-lived signed JWT session tokens (jose library, HS256/EdDSA). Hardware-compatible TOTP Two-Factor Authentication (RFC 6238 / Google Authenticator / Authy) with single-use backup recovery keys. | Enforced & Tested |
| **A08: Software & Data Integrity Failures** | Untrusted deserialization, malicious uploads | Sharp-based image validation and transcoding (`/api/upload`). File size strictly capped at 4MB. MIME-type validation. Randomized WebP filenames preventing directory traversal and executable script execution. | Enforced |
| **A09: Security Logging & Monitoring Failures** | Undetected administrative actions or brute force | Persistent audit log table (`audit_logs`) tracking timestamp, actor ID/email, action (`CREATE`, `UPDATE`, `DELETE`, `STATUS_CHANGE`, `LOGIN`), resource ID, and client IP/User-Agent. | Enforced |
| **A10: Server-Side Request Forgery (SSRF)** | Exploitation of internal network or cloud metadata | Outbound requests restricted to trusted endpoints (OpenStreetMap tiles, Unsplash CDN images). No arbitrary user-supplied URL fetching on the server. | Enforced |

---

## 3. Privacy & GDPR Compliance

- **Data Minimization**: ExploreX collects only traveler names, party size, travel dates, and optional preferences required to quote a private Sri Lankan holiday. No payment card numbers, passport numbers, or biometric data are stored.
- **Explicit User Consent**: WhatsApp booking modal records user consent before logging inquiries into the CRM.
- **Right to Erasure / Access**: Users can request data deletion or export under standard GDPR/CCPA protocols via `privacy@explorex.lk`.
- **Cookie Transparency**: Explicit cookie banner informing users of strictly necessary session cookies vs preferences.

---

## 4. Security Checklist for Production Deployment

- [x] All default passwords rotated from sample seeds.
- [x] `JWT_SECRET` generated with high entropy (`openssl rand -base64 32`).
- [x] HTTPS enforced with HSTS header.
- [x] Content Security Policy (CSP) blocking unauthorized scripts and object injection.
- [x] CORS and frame ancestry locked (`X-Frame-Options: DENY`).
- [x] Cookie `SameSite=Strict`, `Secure`, `HttpOnly` active on production domain.
- [x] TOTP 2FA enabled for all `SUPER_ADMIN` accounts.
- [x] Upload directory quarantined from direct executable execution.
- [x] Audit logging actively recording administrative events.


export function isAdminEmail(
  email: string | undefined | null,
  adminEmails: string | undefined = process.env.ADMIN_EMAILS
): boolean {
  if (!email || !adminEmails) {
    return false;
  }
  
  const allowlist = adminEmails
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(e => e.length > 0);

  return allowlist.includes(email.trim().toLowerCase());
}

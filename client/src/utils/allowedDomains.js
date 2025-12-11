export const allowedDomains = [
    "@up.edu.ph",
    "@student.ateneo.edu",
    "@dlsu.edu.ph",
    "@ust.edu.ph",
]

export const isStudentEmail = (email) => {
    if (!email) return false;
    return allowedDomains.some((domain) => email.endsWith(domain))
}
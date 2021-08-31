const DASH = 45
const NUM_RANGE = [48, 57]
const ALPHA_RANGE = [97, 122]

function urlify(str = '') {
    return str.toLowerCase()
        .split('')
        .map(letter => {
            const code = letter.charCodeAt()

            if (code >= NUM_RANGE[0] && code <= NUM_RANGE[1]) {
                return letter
            }

            if (code >= ALPHA_RANGE[0] && code <= ALPHA_RANGE[1]) {
                return letter
            }

            return DASH
        })
        .join('')
}

export default function getBaseUrl ({ serverSide = false }) {
    if (!process.env.VERCEL_ENV) {
        return serverSide 
          ? process.env.NEXTAUTH_URL_INTERNAL || process.env.NEXTAUTH_URL
          : process.env.NEXTAUTH_URL
    }

    if (process.env.VERCEL_ENV !== 'preview') {
        return process.env.VERCEL_URL
    }

    const host = [
        process.env.VERCEL_GIT_REPO_SLUG,
        urlify(process.env.VERCEL_GIT_COMMIT_REF),
        process.env.VERCEL_GIT_COMMIT_OWNER
    ].join('-')

    return `https://${host}.vercel.app`
}
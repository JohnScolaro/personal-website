const crypto = require("crypto");

export default function sketchRankSecurity(winnerId: number, loserId: number, sessionId: number) {
    // If you're reading this, this isn't supposed to be airtight security,
    // it's just supposed to stop people from being able to ruin my data
    // without doing at least the bare minimum amount of work. If you're
    // reading please *please* don't ruin my data. Pretty pwease!
    return hashWithCrypto(winnerId.toString() + loserId.toString() + sessionId.toString() + "BANANA");
}

function hashWithCrypto(input) {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  return hash;
}

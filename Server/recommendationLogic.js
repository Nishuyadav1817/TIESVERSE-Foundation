function getStack({ stage, teamSize, budget, sector }) {
  let stack = [];
console.log("14")
  if (stage === "idea") {
    stack.push({ label: "Frontend", value: "React + Tailwind" });
    stack.push({ label: "Backend", value: "Node.js + Express" });
  }

  if (stage === "mvp") {
    stack.push({ label: "Frontend", value: "Next.js" });
    stack.push({ label: "Backend", value: "Firebase" });
  }

  if (stage === "growth") {
    stack.push({ label: "Backend", value: "Node.js + MongoDB" });
    stack.push({ label: "Cloud", value: "AWS" });
  }

  if (stage === "scaling") {
    stack.push({ label: "Backend", value: "Microservices + Docker" });
    stack.push({ label: "Cloud", value: "Kubernetes + AWS" });
  }

  // Budget
  if (budget === "low") {
    stack.push({ label: "Hosting", value: "Vercel / Render" });
  } else if (budget === "medium") {
    stack.push({ label: "Hosting", value: "AWS / DigitalOcean" });
  } else {
    stack.push({ label: "Hosting", value: "Dedicated Cloud Infra" });
  }
console.log("15")
  // Sector
  if (sector === "fintech") {
    stack.push({ label: "Security", value: "JWT + OAuth2" });
  }

  if (sector === "edtech") {
    stack.push({ label: "Video", value: "WebRTC / Zoom API" });
  }

  if (sector === "healthtech") {
    stack.push({ label: "Compliance", value: "HIPAA-ready systems" });
  }

  if (sector === "ecommerce") {
    stack.push({ label: "Payments", value: "Stripe / Razorpay" });
  }

  if (sector === "saas") {
    stack.push({ label: "Auth", value: "Firebase Auth / Clerk" });
  }

  return stack;
}
console.log("16")
function getReason(data) {
  return `Based on your ${data.stage} stage startup, ${data.teamSize} team size, ${data.budget} budget, and ${data.sector} sector, this stack is optimized for scalability and cost efficiency.`;
}

module.exports = { getStack, getReason };